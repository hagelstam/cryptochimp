import { formatCurrency, formatPercentage, getDeltaType } from '@/lib/utils';
import { BadgeDelta, Card, Flex, Metric, Text } from '@tremor/react';

type IndicatorCardProps = {
  title: string;
  value: number;
  percentage?: number;
  from?: number;
};

export const IndicatorCard = ({
  title,
  value,
  percentage,
  from,
}: IndicatorCardProps) => {
  return (
    <Card>
      <Flex alignItems="start">
        <Text>{title}</Text>
        {percentage !== undefined && (
          <BadgeDelta deltaType={getDeltaType(percentage)}>
            {formatPercentage(percentage)}
          </BadgeDelta>
        )}
      </Flex>
      <Flex
        justifyContent="start"
        alignItems="baseline"
        className="space-x-3 truncate"
      >
        <Metric>{formatCurrency(value)}</Metric>
        {from && <Text className="truncate">from {formatCurrency(from)}</Text>}
      </Flex>
    </Card>
  );
};
