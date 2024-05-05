"use client"
import { Profile } from "../../_components/shared/profile"
import { useSetupDefaultStoreData } from "../../_lib/hooks/useSetupDefaultStoreData"
import { useLinksStore } from "../../_store/links"
import { useUserStore } from "../../_store/user"
import { PreviewHeader } from "./_components/header"


const Page = () =>{
  useSetupDefaultStoreData()
  const user = useUserStore()
  const { links } = useLinksStore()

  return (
    <div className="bg-light-grey relative">
      <div className="max-w-[1680px] mx-auto 
        before:absolute before:left-0 before:right-0 before:top-0 before:h-[360px] before:rounded-b-[32px] md:before:bg-purple">
        <PreviewHeader />
        <main className="relative z-10 min-h-[calc(100vh-78px)] py-[60px] px-14 md:min-h-[calc(100vh-126px)]">
          <Profile user={{
            ...user,
            links
          }} />
        </main>
      </div>
    </div>
  )
}


export default Page