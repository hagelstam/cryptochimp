import clsx from 'clsx';

export const Skeleton = ({ className }: { className?: string }) => {
  return (
    <div
      className={clsx(
        'flex animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800',
        className
      )}
    />
  );
};
