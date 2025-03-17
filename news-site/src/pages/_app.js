import { SessionProvider } from "next-auth/react";
import { ApolloProvider } from "@apollo/client";
import client from "./lib/apollo-client";
import '../../styles/styles.css'; // Global styles import

export default function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={pageProps.session}>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </SessionProvider>
  );
}
