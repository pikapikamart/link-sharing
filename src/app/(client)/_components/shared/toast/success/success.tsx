import React from "react"
import { UpdateIcon } from "../../../svgs/update"
import { motion } from "framer-motion"


type SuccessProps = {
  children: React.ReactNode
  message: string
}

const Success = ({ message, children }: SuccessProps) => {

  return (
    <motion.div
      initial={{
        opacity: 0, 
        y: "5%"
      }}
      animate={{
        opacity: 1,
        y: "0%"
      }} 
      exit={{
        opacity: 0,
        y: "5%"
      }}
      className="fixed z-[999] flex items-center py-4 px-6 rounded-lg bottom-10 left-1/2 !-translate-x-1/2 bg-dark-grey">
      <div className="mr-2">
        { children }
      </div>
      <p className="text-white font-semibold">
        { message }
      </p>
    </motion.div>
  )
}


export default Success