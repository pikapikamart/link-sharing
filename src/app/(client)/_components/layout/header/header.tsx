import Link from "next/link"
import { LogoMobileIcon } from "../../svgs/logoMobile"
import { LinkIcon } from "../../svgs/link"
import { EyeIcon } from "../../svgs/eye"
import { ProfileIcon } from "../../svgs/profile"
import { LogoIcon } from "../../svgs/logo"


const Header = () =>{

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
        <div className="flex h-[42px] md:h-[46px]">
          <Link
            className="h-full mr-[2px] flex items-center justify-center w-[74px] rounded bg-light-purple text-purple md:w-auto md:px-[27px]" 
            href="/">
            <LinkIcon />
            <span className="hidden md:inline md:ml-2">Links</span>
          </Link>
          <Link
            className="h-full flex items-center justify-center w-[74px] rounded bg-white text-grey md:w-auto md:px-[27px]" 
            href="/">
            <ProfileIcon />
            <span className="hidden md:inline md:ml-2">Profile Details</span>
          </Link>
        </div>
        <Link
          className="text-purple border-purple h-[42px] flex items-center justify-center w-[52px] border rounded md:w-auto md:px-[27px] md:h-[46px]"
          href="/preview">
          <div className="md:hidden">
            <EyeIcon />
          </div>
          <span className="hidden md:inline">Preview</span>
        </Link>
      </nav>
    </header>
  )
}


export default Header