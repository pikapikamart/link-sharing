import { create } from "zustand"
import { createSelectors } from "../"
import { platforms } from "@/app/_server/database/schema"
import { 
  GetElementType, 
  MakeWritable } from "../../../../../types/utils"


export type Platform = GetElementType<MakeWritable<typeof platforms>>

export type Link = {
  platform: Platform
  url: string
  id?: number,
  [ key: string ] : any
}

export type LinkState = {
  links: Link[]
}

export const useLinksStoreBase = create<LinkState>(() => ({
  links: []
})) 

export const setLinks = (links: Link[]) => useLinksStoreBase.setState(() => ({
  links
}))

export const useLinksStore = createSelectors(useLinksStoreBase)