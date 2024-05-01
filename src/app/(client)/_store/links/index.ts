import { create } from "zustand"
import { createSelectors } from "../"
import { platforms } from "@/app/_server/database/schema"
import { 
  GetElementType, 
  MakeWritable } from "../../../../../types/utils"


export type Platform = GetElementType<MakeWritable<typeof platforms>>
 
export const isLink = (link: (Link | "")): link is Link =>{
  return (link as Link).platform !== undefined
}

export type Link = {
  platform: Platform
  url: string
  id?: number
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