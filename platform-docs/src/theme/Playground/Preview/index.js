// The live preview, rendered inside NocProvider and the .noc-live scope (the library's base styles).
import BrowserOnly from "@docusaurus/BrowserOnly";
import ErrorBoundary from "@docusaurus/ErrorBoundary";
import { ErrorBoundaryErrorMessageFallback } from "@docusaurus/theme-common";
import { NocProvider } from "@noc/platform";
import PlaygroundHeader from "@theme/Playground/Header";
import React from "react";
import { LiveError, LivePreview } from "react-live";

export default function PlaygroundPreview() {
  return (
    <>
      <PlaygroundHeader>Result</PlaygroundHeader>
      <div className="noc-live">
        <BrowserOnly fallback={<div>Loading…</div>}>
          {() => (
            <NocProvider>
              <ErrorBoundary fallback={(params) => <ErrorBoundaryErrorMessageFallback {...params} />}>
                <LivePreview />
              </ErrorBoundary>
              <LiveError className="noc-live__error" />
            </NocProvider>
          )}
        </BrowserOnly>
      </div>
    </>
  );
}
