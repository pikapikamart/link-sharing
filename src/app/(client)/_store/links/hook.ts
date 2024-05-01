import { useEffect } from "react"
import { trpc } from "../../_lib/trpc"
import { setLinks } from "."


export const useQueryAndSetLinks = () => {
  const query = trpc.links.get.useQuery(undefined, {
    refetchOnMount: false,
    refetchOnWindowFocus: false
  })

  useEffect(() =>{
    if ( query.isSuccess ) {
      setLinks(query.data.data)  
    }
  }, [ query.isSuccess ])
}