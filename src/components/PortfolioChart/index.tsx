import type { Coin } from "../../types/Coin";
import { Card, DonutChart, Legend, Title } from "@tremor/react";
import { useTranslation } from "../../hooks/useTranslation";
import { formatCurrency } from "../../utils/formatCurrency";

type PortfolioChartProps = {
  wallet: Coin[];
};

const PortfolioChart = ({ wallet }: PortfolioChartProps) => {
  const { t } = useTranslation();

  if (wallet.length === 0)
    return (
      <Card>
        <div className="flex h-96 flex-col items-center justify-center">
          <Title color="gray">{t.transactions.noTransactions}</Title>
        </div>
      </Card>
    );

  return (
    <Card>
      <Title>{t.wallet.portfolio}</Title>
      <DonutChart
        data={wallet}
        category="totalValue"
        dataKey="name"
        valueFormatter={formatCurrency}
        marginTop="mt-6"
      />
      <Legend categories={wallet.map((coin) => coin.name)} marginTop="mt-6" />
    </Card>
  );
};

export default PortfolioChart;
