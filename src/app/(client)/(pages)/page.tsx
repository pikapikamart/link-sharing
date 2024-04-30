"use client"
import Link from "next/link"


const Page = () =>{

  return (
    <main>
      <h1 className="">Test</h1>
      <div>
        <Link href={"/login"}>Login</Link>
      </div>
      <div>
        <Link href={"/register"}>Register</Link>
      </div>
    </main>
  )
}


export default Page