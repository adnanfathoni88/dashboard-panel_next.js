import { GeistSans } from "geist/font/sans";
import { type AppType } from "next/app";
import Sidebar from "~/components/Sidebar";

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div className={GeistSans.className}>
      <Component {...pageProps} />
    </div>
  );
};

export default MyApp;
