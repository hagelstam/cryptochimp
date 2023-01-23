import type { ElementType } from "react";
import {
  Card,
  Metric,
  Text,
  Icon,
  Flex,
  Block,
  BadgeDelta,
} from "@tremor/react";
import { formatCurrency } from "../utils/formatCurrency";

type Color =
  | "blue"
  | "fuchsia"
  | "green"
  | "indigo"
  | "orange"
  | "pink"
  | "purple"
  | "red"
  | "teal"
  | "yellow"
  | "slate"
  | "gray"
  | "zinc"
  | "neutral"
  | "stone"
  | "amber"
  | "lime"
  | "emerald"
  | "cyan"
  | "sky"
  | "violet"
  | "rose";

type IndicatorCardProps = {
  icon: ElementType;
  color: Color;
  title: string;
  metric: number;
  percentage?: string;
};

const IndicatorCard = ({
  icon,
  color,
  metric,
  title,
  percentage,
}: IndicatorCardProps) => {
  return (
    <Card>
      <Flex justifyContent="justify-start" spaceX="space-x-4">
        <Icon icon={icon} variant="light" size="xl" color={color} />
        <Block truncate={true}>
          <Flex alignItems="items-start">
            <Text>{title}</Text>
            {percentage && metric !== 0 && (
              <BadgeDelta
                deltaType={metric < 0 ? "decrease" : "increase"}
                text={percentage}
              />
            )}
          </Flex>
          <Metric truncate={true}>{formatCurrency(metric)}</Metric>
        </Block>
      </Flex>
    </Card>
  );
};

export default IndicatorCard;
