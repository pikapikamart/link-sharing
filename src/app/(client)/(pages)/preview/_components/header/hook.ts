import { useUserStore } from "@/app/(client)/_store/user"
import { 
  useEffect, 
  useState } from "react"


export const usePreviewHeader = () => {
  const user = useUserStore()
  const [ previewUrl, setPreviewUrl ] = useState("")

  useEffect(() =>{
    if ( typeof window !== undefined ) {
      const currentUrl = window.location.href
      setPreviewUrl(`${ currentUrl.substring(0, currentUrl.lastIndexOf("/")+1) }${ user.username }`)
    }
  }, [])

  return {
    previewUrl
  }
}