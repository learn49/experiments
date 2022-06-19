import { createContext, useContext, useEffect, useState } from 'react'
import { request } from 'graphql-request'
import useSWR from 'swr'
import { useRouter } from 'next/router'

const fetcher = (query: string) =>
  request('https://api.learn49.com/graphql', query)

interface IAccount {
  id: string
  friendlyName: string
}
const AccountContext = createContext<IAccount | undefined>(undefined)

interface Props {
  children: JSX.Element
  account: IAccount
}

export const AccountProvider = ({ children, account }: Props) => {
  const router = useRouter()
  const slug = router.query.slug
  const [customData, setCustomData] = useState<any>(account)
  const { data, error } = useSWR<{ account: IAccount }>(
    slug &&
      `query{
      account: getAccountSettingsByDomain(domain: "${slug}.learn49.com"){
        id
        friendlyName
      }
    }`,
    fetcher,
    {
      isPaused: () => {
        return !!account
      },
      /*revalidateIfStale: false,
      refreshWhenHidden: false,
      refreshWhenOffline: false,
      revalidateOnMount: false,
      revalidateOnFocus: false,*/
      fallbackData: { account }
    }
  )
  useEffect(() => {
    if (account) {
      setCustomData(account)
    }
  }, [])
  useEffect(() => {
    if (data?.account) {
      setCustomData(data.account)
    }
  }, [data])
  if (error) {
    return <p>Account not found!</p>
  }
  if (!data) {
    return <p>Loading...</p>
  }
  return (
    <AccountContext.Provider value={customData}>
      <pre>{JSON.stringify(customData)}</pre>
      {children}
    </AccountContext.Provider>
  )
}

export const useAccount = () => {
  return useContext(AccountContext)
}
