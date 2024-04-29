import { procedure, router } from "../..";


// const testProcedure = procedure

export const testRouter = router({
  get: procedure.query(() => {
    return {
      hello: "Raymart"
    }
  })
})