import "../src/index.css";
import type { Preview } from "@storybook/react";
import { initialize, mswLoader } from "msw-storybook-addon";

initialize({
  serviceWorker: {
    url: "./mockServiceWorker.js",
  },
  onUnhandledRequest: (request, print) => {
    if (!request.url.startsWith("/api")) {
      return;
    }
    print.warning();
  },
});

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  loaders: [mswLoader],
};

export default preview;
