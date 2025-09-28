import { Skeleton } from "@/components/Skeleton";
import { getCurrentUser } from "@/lib/auth";
import { LOGIN_URL } from "@/lib/constants";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { TransactionsProvider } from "./TransactionsProvider";

export default async function Transactions() {
  const user = await getCurrentUser();
  if (!user) {
    redirect(LOGIN_URL);
  }

  return (
    <Suspense fallback={<Skeleton className="h-96 w-full" />}>
      <TransactionsProvider userId={user.id} />
    </Suspense>
  );
}
