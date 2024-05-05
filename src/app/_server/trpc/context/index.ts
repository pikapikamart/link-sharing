import { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
import { getServerSession } from 'next-auth';
import { nextAuthOptions } from '../../utils/auth';


export const  createContext = async({ req, resHeaders}: FetchCreateContextFnOptions) => {
  const session = await getServerSession(nextAuthOptions)
 
  return { 
    req, 
    resHeaders,
    session
  }
}

export type Context = Awaited<ReturnType<typeof createContext>>