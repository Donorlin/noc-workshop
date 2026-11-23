import "../src/styles/index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Playground } from "./Playground";
import { NocProvider } from "../src";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NocProvider>
      <Playground />
    </NocProvider>
  </StrictMode>,
);
