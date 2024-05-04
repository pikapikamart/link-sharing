"use client"
import { useSetupDefaultStoreData } from "../../_lib/hooks/useSetupDefaultStoreData"


type HydrateProps = {
  children: React.ReactNode
}

const Hydrate = ({ children }: HydrateProps) =>{
  useSetupDefaultStoreData()

  return (
    <>
      { children }
    </>
  )
}


export default Hydrate