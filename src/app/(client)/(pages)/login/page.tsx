"use client"
import { signIn } from "next-auth/react"


const Page = () =>{

  return (
    <main>
      <button onClick={ () => {
        signIn("credentials", {
          callbackUrl: "/"
        })
      } }> 
        Login
      </button>
    </main>
  )
}


export default Page