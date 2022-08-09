import type { GetStaticProps, NextPage } from 'next'
import { initUrqlClient, } from 'next-urql'
import Head from 'next/head'
import Link from 'next/link'
import { cacheExchange, dedupExchange, fetchExchange, ssrExchange} from 'urql'
import { useAccount } from '../../contexts/AccountContext'

const ACCOUNT_QUERY = `
      query($domain: String!){
          account: getAccountSettingsByDomain(domain: $domain){
            id
            friendlyName
          }
}
`
const Home: NextPage = () => {
  const account = useAccount()
  return (
    <div>
      <Head>
        <title>{account?.friendlyName}</title>
      </Head>
      <h1>Welcome {account?.friendlyName}</h1>
      <p className='text-blue-600'>
        <Link href='/about'>
          <a>About</a>
        </Link>
      </p>
      <p className='text-blue-600'>
        <Link href='/login'>
          <a>Login</a>
        </Link>
      </p>
    </div>
  )
}

export async function getStaticPaths() {
  return { paths: [], fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps = async context => {
  const slug = context?.params?.slug
  const ssrCache = ssrExchange({ isClient: false })
  const client = initUrqlClient(
    {
      url: process.env.NEXT_PUBLIC_API,
      exchanges: [dedupExchange, cacheExchange, ssrCache, fetchExchange],
    },
    false
  )
  try {
    const result = await client?.query(ACCOUNT_QUERY, { domain: `${slug}.learn49.com` }).toPromise()
    const data = result?.data
    const { account } = data
    return {
      props: { account, urqlState: ssrCache.extractData() },
      revalidate: 60,
    }
  } catch (err) {}
  return {
    props: {
      account: null,
    },
    revalidate: 60,
  }
}

export default Home
