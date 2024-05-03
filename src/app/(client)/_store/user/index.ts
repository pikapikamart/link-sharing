import { create } from "zustand"
import { createSelectors } from "../"


export type UserState = {
  firstName?: string | null
  lastName?: string | null
  image?: string | null
  email: string,
  username: string
}

export const useUserStoreBase = create<UserState>(() => ({
  email: "",
  username: ""
})) 

export const setUser = (user: Partial<UserState>) => useUserStoreBase.setState((state) => ({
  ...state,
  ...user
}))

export const useUserStore = createSelectors(useUserStoreBase)