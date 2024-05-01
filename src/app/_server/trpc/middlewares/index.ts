import { MiddlewareResult } from "@trpc/server/unstable-core-do-not-import";
import { Context } from "../context";


export type TrpcNext = {
  (): Promise<MiddlewareResult<Context>>,
  <T>(opts: { ctx: T }): Promise<MiddlewareResult<T>>
}