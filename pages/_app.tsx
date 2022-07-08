import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AccountProvider } from "../contexts/AccountContext";
import { Provider } from "urql";
import { client } from "../lib/graphql";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider value={client}>
      <AccountProvider account={pageProps.account}>
        <Component {...pageProps} />
      </AccountProvider>
    </Provider>
  );
}

export default MyApp;
//  </AccountProvider>
