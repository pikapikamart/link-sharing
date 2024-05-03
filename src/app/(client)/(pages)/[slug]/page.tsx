import { notFound } from "next/navigation"
import { PageSlug } from "../../../../../types/utils"
import { getUserDevlink } from "./action"
import { Preview } from "../../_components/page/home/preview"


const Page = async({ params }: PageSlug) =>{
  const user = await getUserDevlink(params.slug)

  if ( !user ) {
    notFound()
  }

  return (
    <div className="relative bg-light-grey
      before:absolute before:left-0 before:right-0 before:top-0 before:h-[clamp(200px,30vw,360px)] before:rounded-b-[32px] md:before:bg-purple">
      <main className="relative z-10 min-h-screen py-[60px] px-14">
      <Preview user={ user } />
      </main>
    </div>
  )
}


export default Page