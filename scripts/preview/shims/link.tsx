import type { AnchorHTMLAttributes, ReactNode } from "react";
import { toHash } from "../router";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; children?: ReactNode; prefetch?: boolean };

export default function Link({ href, prefetch: _p, ...rest }: Props) {
  void _p;
  return <a href={toHash(href)} {...rest} />;
}
