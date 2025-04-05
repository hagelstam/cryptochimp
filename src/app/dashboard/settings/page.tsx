import { getCurrentUser } from "@/lib/auth";
import { Bold, Card, TextInput, Title } from "@tremor/react";
import { ThemeSelect } from "./ThemeSelect";

export default async function Settings() {
  const user = await getCurrentUser();

  return (
    <Card className="flex w-full justify-center lg:py-12">
      <div className="flex w-full max-w-xl flex-col justify-center gap-6">
        <Title>Account settings</Title>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Bold className="font-medium">Username</Bold>
            <TextInput disabled value={user?.name ?? ""} />
          </div>
          <div className="flex flex-col gap-2">
            <Bold className="font-medium">Email</Bold>
            <TextInput disabled value={user?.email ?? ""} />
          </div>
          <div className="flex flex-col gap-2">
            <Bold className="font-medium">Theme</Bold>
            <ThemeSelect />
          </div>
        </div>
      </div>
    </Card>
  );
}
