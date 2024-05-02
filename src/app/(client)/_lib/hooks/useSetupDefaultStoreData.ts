import { useEffect } from "react"
import { 
  setLinks, 
  useLinksStore } from "../../_store/links"
import { 
  setUser, 
  useUserStore } from "../../_store/user"
import { trpc } from "../trpc"


export const useSetupDefaultStoreData = () =>{
  const query = trpc.user.profile.useQuery(undefined, {
    refetchOnWindowFocus: false
  })
  const { links } = useLinksStore()
  const user = useUserStore()

  useEffect(() =>{
    if ( !query.isSuccess ) return
    const { links, ...restUser } = query.data.data

    if ( !links.length ) {
      setLinks(links)
    }

    if ( !user.email ) {
      setUser(restUser)
    }

  }, [links, user, query.isSuccess])
}