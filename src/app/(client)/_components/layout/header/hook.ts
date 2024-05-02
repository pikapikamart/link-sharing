import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"


export const useHeader = () =>{
  const pathname = usePathname()
  const [ activeNavItem, setActiveNavItem ] = useState<string | null>(null)
  const [ hoveredNavItem, setHoveredNavItem ] = useState<string | null>(null)

  const handleNavItemHover = (navId: string) => {
    setHoveredNavItem(navId)
  }

  const handleNavItemMouseLeave = () => {
    setHoveredNavItem(null)
  }
  
  useEffect(() =>{
    setActiveNavItem(pathname)
  }, [pathname])

  return {
    handleNavItemHover,
    handleNavItemMouseLeave,
    pathname,
    activeNavItem,
    hoveredNavItem
  }
}