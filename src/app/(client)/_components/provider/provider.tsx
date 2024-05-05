"use client"
import { 
  QueryClient, 
  QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'
import React, { useState } from 'react'
import { trpc } from '../../_lib/trpc'
import { SessionProvider } from "next-auth/react"


type ProviderProps = {
  children: React.ReactNode
}

const Provider = ({ children }: ProviderProps) => {
  const [queryClient] = useState(() => new QueryClient())
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: process.env.NEXT_PUBLIC_VERCEL_URL ? "https://link-sharing-devs.vercel.app/api/trpc/" : 'http://localhost:3000/api/trpc/',

          // You can pass any HTTP headers you wish here
          async headers() {
            return {
              // authorization: getAuthCookie(),
            }
          },
        }),
      ],
    }),
  )

  return (
    <SessionProvider refetchOnWindowFocus={ false }>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          { children }
        </QueryClientProvider>
      </trpc.Provider>
    </SessionProvider>
  )
}


export default Provider