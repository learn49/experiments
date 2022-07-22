import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from 'urql'

const ACCOUNT_QUERY = `
      query($domain: String!){
          account: getAccountSettingsByDomain(domain: $domain){
            id
            friendlyName
          }
}
`
interface IAccount {
  id: string
  friendlyName: string
}
interface Props {
  children: JSX.Element
  account: IAccount
}

const AccountContext = createContext<IAccount | undefined>(undefined)

export const AccountProvider = ({ children, account }: Props) => {
  const router = useRouter()
  const slug = router.query.slug
  const [result, reexecuteQuery] = useQuery({
    query: ACCOUNT_QUERY,
    variables: {
      domain: `${slug}.learn49.com`,
    },
    pause: !!account,
  })
  const [accountData, setAccountData] = useState<IAccount>(account)
  const { data, fetching, error } = result

  useEffect(() => {
    if (account) {
      setAccountData(account)
    }
  }, [])

  useEffect(() => {
    if (data?.account) {
      setAccountData(data.account)
    }
  }, [data])

  if (error) {
    return <p>Account not found!</p>
  }
  if (fetching) {
    return <p>Loading...</p>
  }
  return (
    <AccountContext.Provider value={accountData}>
      <pre>{JSON.stringify(data)}</pre>
      {children}
    </AccountContext.Provider>
  )
}

export const useAccount = () => {
  return useContext(AccountContext)
}
