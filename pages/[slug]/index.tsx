import request from 'graphql-request'
import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useQuery } from 'urql'
import { useAccount } from '../../contexts/AccountContext'

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
  try {
    const { account } = await request(
      'https://api.learn49.com/graphql',
      `query{
          account: getAccountSettingsByDomain(domain: "${slug}.learn49.com"){
            id
            friendlyName
          }
  }`
    )
    return {
      props: {
        account,
      },
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
