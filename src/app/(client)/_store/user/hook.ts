import { useEffect } from "react"
import { trpc } from "../../_lib/trpc"
import { setUser } from "."


export const useQueryAndSetUser = () => {
  const query = trpc.user.profile.useQuery(undefined, {
    refetchOnMount: false,
    refetchOnWindowFocus: false
  })

  useEffect(() =>{
    if ( query.isSuccess ) {
      // setUser(query.data.data)
    }
  }, [ query.isSuccess ])
}