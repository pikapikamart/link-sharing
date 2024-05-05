"use client"
import Link from "next/link"
import { LogoMobileIcon } from "../../svgs/logoMobile"
import { EyeIcon } from "../../svgs/eye"
import { LogoIcon } from "../../svgs/logo"
import { useHeader } from "./hook"
import { headerData } from "./data"
import { 
  motion,
  AnimatePresence } from "framer-motion"
import { LogoutIcon } from "../../svgs/logout"
import { signOut } from "next-auth/react"


const Header = () =>{
  const { 
    pathname,
    handleNavItemHover,
    handleNavItemMouseLeave,
    activeNavItem,
    hoveredNavItem } = useHeader()

  const renderNavlinks = () =>{
    const mappedLinks = headerData.map(link => (
      <li
        className="relative"
        key={ `header-${ link.href }` }
        onMouseMove={ () => handleNavItemHover(link.href) }
        onMouseLeave={ handleNavItemMouseLeave }>
        <Link
          className={`relative z-10 h-full mr-[2px] flex items-center justify-center w-[64px] rounded text-grey md:w-auto md:px-[27px] lg:hover:text-purple ${ activeNavItem===link.href && "text-purple" }`}
          href={ link.href }
          aria-current={pathname===link.href? 'page' : 'false'}>
          { link.icon() }
          <span className="hidden md:inline md:ml-2">{ link.label }</span>
        </Link>
        <AnimatePresence>
          {hoveredNavItem === link.href && (
            <motion.span
              layoutId="hover"
              exit={{ opacity: 0 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="absolute inset-0 bg-light-purple rounded-lg" />
          )}
        </AnimatePresence>
        <AnimatePresence>
          { (activeNavItem === link.href || hoveredNavItem===link.href) && (
            <motion.span
              layoutId="active"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="absolute inset-0 bg-light-purple rounded-lg" />
          )}
        </AnimatePresence>
      </li>
    ))

    return mappedLinks
  }

  return (
    <header className="bg-light-grey md:h-[126px] md:p-6">
      <nav className="flex justify-between items-center w-full ps-6 pe-4 h-[74px] bg-white font-semibold md:rounded-lg">
        <Link href="/">
          <div className="md:hidden">
            <LogoMobileIcon />
          </div>
          <div className="hidden md:block md:w-[146px]">
            <LogoIcon />
          </div>
        </Link>
        <ul className="flex h-[42px] md:h-[46px]">
          { renderNavlinks() }
        </ul>
        <div className="flex items-center">
          <Link
            className="text-purple border-purple h-[42px] flex items-center justify-center w-[52px] border rounded md:w-auto md:px-[27px] md:h-[46px] lg:transition-colors lg:hover:bg-light-purple"
            href="/preview">
            <div className="md:hidden">
              <EyeIcon />
            </div>
            <span className="hidden md:inline">Preview</span>
          </Link>
          <button 
            className="h-[42px] w-[52px] flex items-center justify-center rounded md:ml-2 lg:transition-colors lg:hover:bg-red lg:hover:bg-opacity-30"
            onClick={ () => signOut({ callbackUrl: "/login" }) }>
            <LogoutIcon />
          </button>
        </div>
      </nav>
    </header>
  )
}


export default Header