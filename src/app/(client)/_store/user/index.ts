import { create } from "zustand"
import { createSelectors } from "../"


export type UserState = {
  firstName?: string
  lastName?: string
  image?: string | null
  email: string
}

export const useUserStoreBase = create<UserState>(() => ({
  email: ""
})) 

export const setUser = (user: UserState) => useUserStoreBase.setState(() => ({...user}))

export const useUserStore = createSelectors(useUserStoreBase)