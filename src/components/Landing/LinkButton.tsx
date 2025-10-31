import clsx from "clsx";
import Link from "next/link";
import type { ReactNode } from "react";

export const LinkButton = ({
  children,
  href,
  className,
  newTab = false,
}: {
  children: ReactNode;
  href: string;
  className: string;
  newTab?: boolean;
}) => {
  return (
    <Link
      href={href}
      target={newTab ? "_blank" : "_self"}
      className={clsx(
        "inline-flex h-11 items-center justify-center rounded-lg px-8 text-base font-medium",
        className
      )}
    >
      {children}
    </Link>
  );
};
