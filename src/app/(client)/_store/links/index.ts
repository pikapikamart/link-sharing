import { create } from "zustand"
import { createSelectors } from "../"


export type Platform = "" | "github" | "youtube" | "linkedin" | "facebook" | "frontendmentor" | "hashnode" | "web" | "twitter" | "twitch" | "devto" | "codewars" | "freecodecamp" | "gitlab" | "stackoverflow"
 
export const isLink = (link: (Link | "")): link is Link =>{
  return (link as Link).platform !== undefined
}

export type Link = {
  platform: Platform
  url: string
}

export type LinkState = {
  links: Link[]
}

export const useLinksStoreBase = create<LinkState>(() => ({
  links: []
})) 

export const setLinks = (links: Link[]) => useLinksStoreBase.setState(state => ({
  links
}))

export const useLinkStore = createSelectors(useLinksStoreBase)