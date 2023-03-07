import type { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import { Block, Col, ColGrid } from "@tremor/react";
import {
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
  BanknotesIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/solid";
import ErrorPage from "@/components/ErrorPage";
import IndicatorCard from "@/components/IndicatorCard";
import PortfolioChart from "@/components/PortfolioChart";
import WalletTable from "@/components/WalletTable";
import Layout from "@/components/Layout";
import CapitalChart from "@/components/CapitalChart";
import { api } from "@/utils/api";

const Dashboard: NextPage = () => {
  const { data: session, status } = useSession();
  if (!session?.user && status !== "loading") {
    signIn();
  }

  const {
    data: walletData,
    isLoading,
    isError,
  } = api.wallet.getWalletData.useQuery();

  if (isError) return <ErrorPage />;

  return (
    <Layout title="Dashboard">
      <ColGrid numColsMd={2} numColsLg={3} gapX="gap-x-6" gapY="gap-y-6">
        {isLoading ? (
          <>
            <div className="flex h-[108px] w-full animate-pulse rounded-lg bg-slate-200" />
            <div className="flex h-[108px] w-full animate-pulse rounded-lg bg-slate-200" />
            <div className="flex h-[108px] w-full animate-pulse rounded-lg bg-slate-200" />
          </>
        ) : (
          <>
            <IndicatorCard
              title="Development"
              metric={walletData.development.value}
              percentage={walletData.development.percentage}
              color={walletData.development.value < 0 ? "red" : "green"}
              icon={
                walletData.development.value < 0
                  ? ArrowTrendingDownIcon
                  : ArrowTrendingUpIcon
              }
            />
            <IndicatorCard
              title="Capital"
              metric={walletData.capital}
              color="blue"
              icon={BuildingLibraryIcon}
            />
            <IndicatorCard
              title="Balance"
              metric={walletData.balance}
              color="purple"
              icon={BanknotesIcon}
            />
          </>
        )}
      </ColGrid>
      <Block marginTop="mt-6">
        <ColGrid numColsLg={6} gapX="gap-x-6" gapY="gap-y-6" marginTop="mt-6">
          <Col numColSpanLg={4}>
            {isLoading ? (
              <div className="flex h-96 w-full animate-pulse rounded-lg bg-slate-200" />
            ) : (
              <CapitalChart
                chartData={[
                  {
                    date: "Jan 22",
                    price: 2890,
                  },
                  {
                    date: "Feb 22",
                    price: 2756,
                  },
                  {
                    date: "Mar 22",
                    price: 3322,
                  },
                  {
                    date: "Apr 22",
                    price: 3470,
                  },
                  {
                    date: "May 22",
                    price: 3475,
                  },
                  {
                    date: "Jun 22",
                    price: 3987,
                  },
                ]}
              />
            )}
          </Col>
          <Col numColSpanLg={2}>
            {isLoading ? (
              <div className="flex h-96 w-full animate-pulse rounded-lg bg-slate-200" />
            ) : (
              <PortfolioChart coins={walletData.ownedCoins} />
            )}
          </Col>
        </ColGrid>
      </Block>
      <Block marginTop="mt-6">
        {isLoading ? (
          <div className="flex h-96 w-full animate-pulse rounded-lg bg-slate-200" />
        ) : (
          <WalletTable coins={walletData.ownedCoins} />
        )}
      </Block>
    </Layout>
  );
};

export default Dashboard;
