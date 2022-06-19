import type { NextPage } from 'next'
import Head from 'next/head'
import { useAccount } from '../../contexts/AccountContext'

const About: NextPage = () => {
  const account = useAccount()
  return (
    <div>
      <Head>
        <title>About</title>
      </Head>
      <h1>About {account?.friendlyName}</h1>
      <pre>{JSON.stringify(account)}</pre>
    </div>
  )
}

export default About
