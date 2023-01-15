import { useState } from "react";
import {
  Card,
  Dropdown,
  DropdownItem,
  Flex,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Badge,
  MultiSelectBox,
  MultiSelectBoxItem,
  Title,
} from "@tremor/react";
import { trpc } from "../utils/trpc";
import { formatDate, formatPrice } from "../utils/formatters";

export default function TableView() {
  const [selectedType, setSelectedType] = useState("ALL");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedSymbols, setSelectedSymbols] = useState<string[]>([]);

  const { data: transactions } = trpc.transaction.getAll.useQuery();

  if (!transactions)
    return (
      <div className="flex h-96 w-full animate-pulse rounded-lg bg-gray-100 dark:bg-gray-300" />
    );

  if (transactions?.length === 0)
    return (
      <Card>
        <div className="flex h-96 flex-col items-center justify-center">
          <Title color="gray">No transactions yet</Title>
        </div>
      </Card>
    );

  const possibleSymbols: string[] = [
    ...new Set(transactions.map((transaction) => transaction.symbol)),
  ];

  return (
    <Card>
      <Flex justifyContent="justify-start" spaceX="space-x-2">
        <Title>Transactions</Title>
        <Badge text={`${transactions?.length}`} color="gray" />
      </Flex>
      <Flex justifyContent="justify-start" spaceX="space-x-4" marginTop="mt-4">
        <MultiSelectBox
          onValueChange={(value: string[]) => setSelectedSymbols(value)}
          placeholder="Select symbols..."
          maxWidth="max-w-xs"
        >
          {possibleSymbols.map((symbol) => (
            <MultiSelectBoxItem key={symbol} value={symbol} text={symbol} />
          ))}
        </MultiSelectBox>

        <Dropdown
          maxWidth="max-w-min"
          defaultValue="ALL"
          onValueChange={(value) => setSelectedType(value)}
        >
          <DropdownItem value="ALL" text="All transaction types" />
          <DropdownItem value="BUY" text="Buy" />
          <DropdownItem value="SELL" text="Sell" />
        </Dropdown>

        <Dropdown
          maxWidth="max-w-0"
          defaultValue="newest"
          onValueChange={(value) => setSortBy(value)}
        >
          <DropdownItem value="newest" text="Newest" />
          <DropdownItem value="oldest" text="Oldest" />
        </Dropdown>
      </Flex>

      <Table marginTop="mt-6">
        <TableHead>
          <TableRow>
            <TableHeaderCell>Date</TableHeaderCell>
            <TableHeaderCell textAlignment="text-right">Coin</TableHeaderCell>
            <TableHeaderCell textAlignment="text-right">
              Transaction type
            </TableHeaderCell>
            <TableHeaderCell textAlignment="text-right">Amount</TableHeaderCell>
            <TableHeaderCell textAlignment="text-right">
              Price per coin
            </TableHeaderCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {transactions
            .sort((a, b) => {
              if (sortBy === "oldest") {
                return a.createdAt.getTime() - b.createdAt.getTime();
              }
              return b.createdAt.getTime() - a.createdAt.getTime();
            })
            .filter(
              (transaction) =>
                transaction.type === selectedType || selectedType === "ALL"
            )
            .filter(
              (transaction) =>
                selectedSymbols.includes(transaction.symbol) ||
                selectedSymbols.length === 0
            )
            .map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{formatDate(transaction.createdAt)}</TableCell>
                <TableCell textAlignment="text-right">
                  {transaction.symbol}
                </TableCell>
                <TableCell textAlignment="text-right">
                  <Badge
                    text={transaction.type}
                    size="xs"
                    color={transaction.type === "BUY" ? "blue" : "pink"}
                  />
                </TableCell>
                <TableCell textAlignment="text-right">
                  {transaction.amount}
                </TableCell>
                <TableCell textAlignment="text-right">
                  {formatPrice(transaction.pricePerCoin)}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </Card>
  );
}