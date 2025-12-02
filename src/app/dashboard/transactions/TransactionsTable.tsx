'use client';

import { EmptyPlaceholder } from '@/components/EmptyPlaceholder';
import { formatCurrency } from '@/lib/utils';
import { Transaction } from '@/generated/client';
import {
  Badge,
  Card,
  DateRangePicker,
  DateRangePickerItem,
  DateRangePickerValue,
  Flex,
  MultiSelect,
  MultiSelectItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Title,
} from '@tremor/react';
import { useState } from 'react';

export const TransactionsTable = ({
  transactions,
}: {
  transactions: Transaction[];
}) => {
  const [dateRange, setDateRange] = useState<DateRangePickerValue>();
  const [selectedSymbols, setSelectedSymbols] = useState<string[]>([]);

  if (transactions.length === 0) return <EmptyPlaceholder className="h-96" />;

  const today = new Date();
  const uniqueSymbols = [
    ...new Set(transactions.map((transaction) => transaction.symbol)),
  ];

  const filteredTransactions = transactions
    .filter((transaction) => {
      if (!dateRange?.from || !dateRange?.to) return true;
      return (
        transaction.createdAt >= dateRange.from &&
        transaction.createdAt <= dateRange.to
      );
    })
    .filter(
      (transaction) =>
        selectedSymbols.includes(transaction.symbol) ||
        selectedSymbols.length === 0
    );

  return (
    <Card>
      <Flex justifyContent="start" className="space-x-2">
        <Title>Transactions</Title>
        <Badge color="gray">{filteredTransactions.length}</Badge>
      </Flex>
      <div className="mt-4 flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
        <DateRangePicker
          className="max-w-sm"
          value={dateRange}
          onValueChange={setDateRange}
        >
          <DateRangePickerItem
            key="day"
            value="day"
            from={new Date(new Date().setDate(today.getDate() - 1))}
            to={today}
          >
            Today
          </DateRangePickerItem>
          <DateRangePickerItem
            key="week"
            value="week"
            from={
              new Date(new Date().setDate(today.getDate() - today.getDay()))
            }
            to={today}
          >
            This Week
          </DateRangePickerItem>
          <DateRangePickerItem
            key="month"
            value="month"
            from={new Date(today.getFullYear(), today.getMonth(), 1)}
            to={today}
          >
            This Month
          </DateRangePickerItem>
          <DateRangePickerItem
            key="year"
            value="year"
            from={new Date(today.getFullYear(), 0, 1)}
            to={today}
          >
            This Year
          </DateRangePickerItem>
          <DateRangePickerItem
            key="all-time"
            value="all-time"
            from={transactions[transactions.length - 1].createdAt}
            to={today}
          >
            All time
          </DateRangePickerItem>
        </DateRangePicker>
        <MultiSelect
          onValueChange={setSelectedSymbols}
          value={selectedSymbols}
          placeholder="Select symbols..."
          className="max-w-56"
        >
          {uniqueSymbols.map((symbol) => (
            <MultiSelectItem key={symbol} value={symbol}>
              {symbol}
            </MultiSelectItem>
          ))}
        </MultiSelect>
      </div>
      <Table className="mt-6">
        <TableHead>
          <TableRow>
            <TableHeaderCell>Date</TableHeaderCell>
            <TableHeaderCell className="text-right">Coin</TableHeaderCell>
            <TableHeaderCell className="text-right">Type</TableHeaderCell>
            <TableHeaderCell className="text-right">Quantity</TableHeaderCell>
            <TableHeaderCell className="text-right">Price/Coin</TableHeaderCell>
            <TableHeaderCell className="text-right">Total</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredTransactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>
                {transaction.createdAt.toLocaleDateString('fi-FI')}
              </TableCell>
              <TableCell className="text-right">{transaction.symbol}</TableCell>
              <TableCell className="text-right">
                <Badge
                  size="xs"
                  color={transaction.type === 'BUY' ? 'blue' : 'pink'}
                >
                  {transaction.type}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                {transaction.quantity.toLocaleString('fi-FI')}
              </TableCell>
              <TableCell className="text-right">
                {formatCurrency(transaction.pricePerCoin)}
              </TableCell>
              <TableCell className="text-right">
                <span
                  className={
                    transaction.type === 'BUY'
                      ? 'text-red-500'
                      : 'text-green-500'
                  }
                >
                  {`${transaction.type === 'BUY' ? '-' : '+'}${formatCurrency(
                    transaction.quantity * transaction.pricePerCoin
                  )}`}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};
