import { TRPCError } from "@trpc/server"
import { TRPC_ERROR_CODE_KEY } from "@trpc/server/rpc"


export const trpcError = <T extends TRPC_ERROR_CODE_KEY, K>(
  code: TRPC_ERROR_CODE_KEY,
  message: string
) => {
  throw new TRPCError({
    code,
    message
  })
}

export const trpcSuccess = <T = {}>( message: string, data: T  ) => {

  return {
    message,
    data
  }
}