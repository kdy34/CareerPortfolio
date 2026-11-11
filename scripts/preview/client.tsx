import { hydrateRoot } from "react-dom/client";
import { PreviewApp } from "./App";
import { startRouter } from "./router";

startRouter();
hydrateRoot(document.getElementById("root")!, <PreviewApp />);
