"use client"
import { PreviewHeader } from "../../_components/page/preview/header"
import { useSetupDefaultStoreData } from "../../_lib/hooks/useSetupDefaultStoreData"


const Page = () =>{
  useSetupDefaultStoreData()

  return (
    <div className="relative
      before:absolute before:left-0 before:right-0 before:top-0 before:h-[360px] before:rounded-b-[32px] md:before:bg-purple">
      <PreviewHeader />
      <main className="bg-light-grey min-h-[calc(100vh-74px)] p-4 md:min-h-[calc(100vh-126px)] md:py-0 md:px-6 lg:grid lg:grid-cols-[560px,1fr] lg:gap-x-6 lg:grid-rows-[834px] lg:pb-6 lg:overflow-hidden">
      </main>
    </div>
  )
}


export default Page