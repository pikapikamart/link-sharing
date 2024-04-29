"use client"
import { trpc } from "../_lib/trpc"


const Page = () =>{
  const test = trpc.test.get.useQuery(undefined)
  
  return (
    <main>
      <h1 className="">Test</h1>
    </main>
  )
}


export default Page