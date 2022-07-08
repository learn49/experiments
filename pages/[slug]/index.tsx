import request from "graphql-request";
import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useQuery } from "urql";
import { useAccount } from "../../contexts/AccountContext";

const Home: NextPage = () => {
  const account = useAccount();
  return (
    <div>
      <Head>
        <title>{account?.friendlyName}</title>
      </Head>
      <h1>Welcome hugo! {account?.friendlyName}</h1>
      <p>
        <Link href="/about">
          <a>hugo-About</a>
        </Link>
      </p>
    </div>
  );
};

export async function getStaticPaths() {
  return { paths: [], fallback: "blocking" };
}

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context?.params?.slug;
  try {
    const { account } = await request(
      "https://api.learn49.com/graphql",
      `
  query{
    account: getAccountSettingsByDomain(domain: "${slug}.learn49.com"){
      id
      friendlyName
    }
  }`
    );
    return {
      props: {
        account,
      },
      revalidate: 60,
    };
  } catch (err) {}
  return {
    props: {
      account: null,
    },
    revalidate: 60,
  };
};

export default Home;
