// @ts-nocheck
import { ScrollViewStyleReset } from "expo-router/html";
import type { PropsWithChildren } from "react";

export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="en" style={{ height: "100%" }}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        {/*
          Disable body scrolling on web to make ScrollView components work correctly.
          If you want to enable scrolling, remove `ScrollViewStyleReset` and
          set `overflow: auto` on the body style below.
        */}
        <ScrollViewStyleReset />
        <style
          dangerouslySetInnerHTML={{
            __html: `
              body > div:first-child { position: fixed !important; top: 0; left: 0; right: 0; bottom: 0; }
              [role="tablist"] [role="tab"] * { overflow: visible !important; }
              [role="heading"], [role="heading"] * { overflow: visible !important; }

              /* ═══ TESTIMONIALS FIX — present from first render ═══ */
              [data-testid="tGrid"] {
                display: flex !important;
                flex-direction: column !important;
                width: 100% !important;
                min-width: 0 !important;
                box-sizing: border-box !important;
              }
              [data-testid="tGridCard"] {
                display: flex !important;
                flex-direction: column !important;
                width: 100% !important;
                min-width: 0 !important;
                box-sizing: border-box !important;
                writing-mode: horizontal-tb !important;
                white-space: normal !important;
                word-break: normal !important;
                overflow-wrap: break-word !important;
              }
              [data-testid="tGridCard"] * {
                writing-mode: horizontal-tb !important;
                white-space: normal !important;
                word-break: normal !important;
                overflow-wrap: break-word !important;
                max-width: 100% !important;
              }
              @media (min-width: 768px) {
                [data-testid="tGrid"] {
                  flex-direction: row !important;
                  gap: 16px !important;
                }
                [data-testid="tGridCard"] {
                  flex: 1 1 0% !important;
                  width: auto !important;
                  min-width: 0 !important;
                }
              }
            `,
          }}
        />
      </head>
      <body
        style={{
          margin: 0,
          height: "100%",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {children}
      </body>
    </html>
  );
}
