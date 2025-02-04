import { GeistSans } from "geist/font/sans";
import { type AppType } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "~/styles/globals.css";

const queryClinet = new QueryClient();

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <QueryClientProvider client={queryClinet}>
      <div className={GeistSans.className}>
        <Component {...pageProps} />
      </div>
    </QueryClientProvider>
  );
};

export default MyApp;
