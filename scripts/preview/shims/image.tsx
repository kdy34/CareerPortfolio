import type { ImgHTMLAttributes } from "react";

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> & { src: string; priority?: boolean; quality?: number };

/** Preview stand-in for next/image: a plain responsive <img> with a relative path. */
export default function Image({ src, priority, quality: _q, ...rest }: Props) {
  void _q;
  return <img src={src.replace(/^\//, "")} loading={priority ? "eager" : "lazy"} decoding="async" {...rest} />;
}
