import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AccountProvider } from '../contexts/AccountContext'
import { withUrqlClient } from 'next-urql'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AccountProvider account={pageProps.account}>
      <Component {...pageProps} />
    </AccountProvider>
  )
}

export default withUrqlClient(
  ssr => ({
    url: process.env.NEXT_PUBLIC_API,
  }),
  { ssr: false } // Important so we don't wrap our component in getInitialProps
)(MyApp)
