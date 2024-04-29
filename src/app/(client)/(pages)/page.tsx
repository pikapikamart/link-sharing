"use client"
import { trpc } from "../_lib/trpc"
import Link from "next/link"


const Page = () =>{
  const test = trpc.test.get.useQuery(undefined)

  return (
    <main>
      <h1 className="">Test</h1>
      <Link href={"/login"}>Login</Link>
    </main>
  )
}


export default Page