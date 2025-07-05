"use client";
import { type ForesightRegisterOptions } from "js.foresight";
import type { LinkProps } from "next/link";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useForesight from "../hooks/useForesight";

interface ForesightLinkProps
  extends Omit<LinkProps, "prefetch">,
    Omit<ForesightRegisterOptions, "element" | "callback"> {
  children: React.ReactNode;
  className?: string;
}

export function ForesightLink({
  children,
  className,
  hitSlop = 0,
  unregisterOnCallback = true,
  name = "",
  ...props
}: ForesightLinkProps) {
  const router = useRouter(); // import from "next/navigation" not "next/router"

  const { elementRef, registerResults } = useForesight<HTMLAnchorElement>({
    callback: () => router.prefetch(props.href.toString()),
    hitSlop: hitSlop,
    name: name,
    unregisterOnCallback: unregisterOnCallback,
  });

  return (
    <Link
      {...props}
      prefetch={registerResults?.isTouchDevice ?? false}
      ref={elementRef}
      className={className}
    >
      {children}
    </Link>
  );
}
