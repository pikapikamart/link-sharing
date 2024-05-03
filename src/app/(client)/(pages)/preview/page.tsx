"use client"
import { PreviewHeader } from "../../_components/page/preview/header"
import { PreviewProfile } from "../../_components/page/preview/header/profile"
import { useSetupDefaultStoreData } from "../../_lib/hooks/useSetupDefaultStoreData"


const Page = () =>{
  useSetupDefaultStoreData()

  return (
    <div className="relative bg-light-grey
      before:absolute before:left-0 before:right-0 before:top-0 before:h-[360px] before:rounded-b-[32px] md:before:bg-purple">
      <PreviewHeader />
      <main className="relative z-10 min-h-[calc(100vh-78px)] py-[60px] px-14 md:min-h-[calc(100vh-126px)]">
        <PreviewProfile />
      </main>
    </div>
  )
}


export default Page