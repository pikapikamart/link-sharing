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
      className="fixed z-[999] w-full flex justify-center px-4 bottom-10 left-0">
      <div className="flex items-center p-4 rounded-lg bg-dark-grey md:px-6">
        <div className="mr-2">
          { children }
        </div>
        <p className="text-white font-semibold text-sm md:text-base">
          { message }
        </p>
      </div>
    </motion.div>
  )
}


export default Success