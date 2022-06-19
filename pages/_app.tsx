import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AccountProvider } from '../contexts/AccountContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AccountProvider account={pageProps.account}>
      <Component {...pageProps} />
    </AccountProvider>
  )
}

export default MyApp
