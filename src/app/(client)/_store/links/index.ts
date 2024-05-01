import { create } from "zustand"
import { createSelectors } from "../"


type Link = {
  platform: "github" | "youtube" | "linkedin" | "facebook" | "frontendmentor" | "hashnode" | "web"
  url: string
}

export type LinkState = {
  links: Link[]
}

export const useLinksStoreBase = create<LinkState>(() => ({
  links: []
})) 

export const updateLink = ( updatedLink: Link) => useLinksStoreBase.setState(state => ({
  links: state.links.map(link => link.platform===updatedLink.platform? {
    ...link,
    ...updatedLink
  } : link)
}))

export const addLink = ( link: Link ) => useLinksStoreBase.setState(state => ({
  links: state.links.concat(link)
}))

export const moveLink = (activeIndex: number, overIndex: number) => useLinksStoreBase.setState(state => ({
  links: [
    ...state.links.slice(0, activeIndex),
    ...state.links.slice(activeIndex+1, overIndex),
    state.links.find((link, index) => index===activeIndex) as Link
  ]
}))

export const removeLink = (removedLink: Link) => useLinksStoreBase.setState(state => ({
  links: state.links.filter(link => link.platform!!+=removedLink.platform)
}))

export const useLinkStore = createSelectors(useLinksStoreBase)