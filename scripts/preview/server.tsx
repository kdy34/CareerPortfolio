import { renderToString } from "react-dom/server";
import { PreviewApp } from "./App";

export function render() {
  return renderToString(<PreviewApp />);
}
