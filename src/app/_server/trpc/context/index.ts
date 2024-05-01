import { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
import { getToken } from 'next-auth/jwt';


export const  createContext = async({ req, resHeaders}: FetchCreateContextFnOptions) => {
  const token = await getToken({ req })

  return { 
    req, 
    resHeaders,
    token
  }
}

export type Context = Awaited<ReturnType<typeof createContext>>