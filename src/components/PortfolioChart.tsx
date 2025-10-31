'use client';

import {
  calculateCoinShare,
  formatCurrency,
  formatPercentage,
} from '@/lib/utils';
import { OwnedCoin } from '@/types';
import { ChartPieIcon, QueueListIcon } from '@heroicons/react/24/outline';
import {
  Badge,
  Card,
  DonutChart,
  Flex,
  Legend,
  List,
  ListItem,
  Tab,
  TabGroup,
  TabList,
  Title,
} from '@tremor/react';
import { useState } from 'react';

export const PortfolioChart = ({
  chartData,
  portfolioValue,
}: {
  chartData: OwnedCoin[];
  portfolioValue: number;
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <Card className="h-full">
      <Flex className="space-x-6" justifyContent="between" alignItems="center">
        <Title>Asset allocation</Title>
        <TabGroup
          className="max-w-[164px]"
          index={selectedIndex}
          onIndexChange={setSelectedIndex}
        >
          <TabList variant="solid">
            <Tab icon={ChartPieIcon}>Chart</Tab>
            <Tab icon={QueueListIcon}>List</Tab>
          </TabList>
        </TabGroup>
      </Flex>
      {selectedIndex === 0 ? (
        <div className="mt-6 grid gap-6">
          <DonutChart
            data={chartData}
            category="totalValue"
            index="name"
            valueFormatter={formatCurrency}
            noDataText="No assets"
          />
          <Legend categories={chartData.map((coin) => coin.name)} />
        </div>
      ) : (
        <>
          <p className="mt-6 flex items-center justify-between text-tremor-label text-tremor-content-strong dark:text-dark-tremor-content-strong">
            <span>Asset</span>
            <span>Amount / Share</span>
          </p>
          <List className="mt-2">
            {chartData
              .sort((a, b) => b.totalValue - a.totalValue)
              .map((data) => (
                <ListItem key={data.name}>
                  <span className="truncate">{data.name}</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">
                      {formatCurrency(data.totalValue)}
                    </span>
                    <Badge size="xs" color="gray">
                      {formatPercentage(
                        calculateCoinShare(data.totalValue, portfolioValue)
                      )}
                    </Badge>
                  </div>
                </ListItem>
              ))}
          </List>
        </>
      )}
    </Card>
  );
};
