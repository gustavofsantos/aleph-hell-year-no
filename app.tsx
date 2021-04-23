import React, { ComponentType } from "react";
import { HardChoiceProvider } from "~/lib/hard-choice.tsx";

export default function App({
  Page,
  pageProps,
}: {
  Page: ComponentType<any>;
  pageProps: any;
}) {
  return (
    <main>
      <head>
        <meta name="viewport" content="width=device-width" />
      </head>
      <HardChoiceProvider>
        <Page {...pageProps} />
      </HardChoiceProvider>
    </main>
  );
}
