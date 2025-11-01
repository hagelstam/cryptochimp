import { Bold, TextInput } from '@tremor/react';
import { cacheLife } from 'next/cache';

export const UserProfile = async ({
  name,
  email,
}: {
  name: string;
  email: string;
}) => {
  'use cache';
  cacheLife('hours');

  return (
    <>
      <div className="flex flex-col gap-2">
        <Bold className="font-medium">Username</Bold>
        <TextInput disabled value={name ?? ''} />
      </div>
      <div className="flex flex-col gap-2">
        <Bold className="font-medium">Email</Bold>
        <TextInput disabled value={email ?? ''} />
      </div>
    </>
  );
};
