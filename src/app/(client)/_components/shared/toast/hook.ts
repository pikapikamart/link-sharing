"use client"
import { 
  useEffect, 
  useState } from "react"


export const useToast = (duration?: number) => {
  const [ shouldShow, setShouldShow ] = useState(false)

  const handleChangeToast = ( val: boolean ) =>{
    setShouldShow(val)
  }

  useEffect(() =>{
    if ( shouldShow ) {
      setTimeout(() => setShouldShow(false), duration?? 2000)
    }
  }, [shouldShow])

  return {
    shouldShow,
    handleChangeToast
  }
}