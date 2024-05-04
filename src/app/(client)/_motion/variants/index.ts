import { Variants } from "framer-motion"


export const swiperVariant:Variants = {
  initial: {
    opacity: 0,
    x: "-5%"
  },
  animate: {
    opacity: 1,
    x: "0%"
  },
  exit: {
    opacity: 0,
    x: "10%"
  }
}

export const fadeVariant: Variants = {
  initial: {
    opacity: 0
  },
  animate: {
    opacity: 1
  },
}