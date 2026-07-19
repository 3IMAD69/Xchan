import { Link, useRouter } from "@tanstack/react-router";
import { type ForesightRegisterOptions } from "js.foresight";
import useForesight from "../hooks/useForesight";

interface ForesightLinkProps
  extends Omit<ForesightRegisterOptions, "element" | "callback"> {
  to: string;
  params?: Record<string, string>;
  children: React.ReactNode;
  className?: string;
}

export function ForesightLink({
  children,
  className,
  hitSlop = 0,
  unregisterOnCallback = true,
  name = "",
  to,
  params,
}: ForesightLinkProps) {
  const router = useRouter();

  const { elementRef, registerResults } = useForesight<HTMLAnchorElement>({
    callback: () =>
      // Dynamic `to`/`params` forwarded as-is; resolved at runtime.
      router.preloadRoute({ to, params } as never),
    hitSlop: hitSlop,
    name: name,
    unregisterOnCallback: unregisterOnCallback,
  });

  return (
    <Link
      to={to}
      params={params}
      preload={registerResults?.isTouchDevice ? "intent" : false}
      ref={elementRef as never}
      className={className}
    >
      {children}
    </Link>
  );
}
