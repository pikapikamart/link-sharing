"use client"
import { Header } from "../_components/layout/header"
import { HomeForm } from "../_components/page/home/form"
import { HomePreview } from "../_components/page/home/preview"


const Page = () =>{

  return (
    <>
      <Header />
      <main className="bg-light-grey min-h-[calc(100vh-74px)] p-4 md:min-h-[calc(100vh-126px)] md:py-0 md:px-6 lg:grid lg:grid-cols-[560px,1fr] lg:gap-x-6 lg:grid-rows-[834px] lg:pb-6">
        <HomePreview />
        <HomeForm />
      </main>
    </>
  )
}


export default Page