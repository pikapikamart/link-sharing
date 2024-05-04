"use client"

import { useSetupDefaultStoreData } from "../../_lib/hooks/useSetupDefaultStoreData"


type HydrateProps = {
  children: React.ReactNode
}

const Hydate = ({ children }: HydrateProps) =>{
  useSetupDefaultStoreData()

  return (
    <>
      { children }
    </>
  )
}


export default Hydate