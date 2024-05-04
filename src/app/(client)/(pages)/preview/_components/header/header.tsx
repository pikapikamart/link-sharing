import { useUserStore } from "@/app/(client)/_store/user"
import Link from "next/link"
import { CopyToClipboard } from "react-copy-to-clipboard"
import { AnimatePresence } from "framer-motion"
import { useToast } from "@/app/(client)/_components/shared/toast/hook"
import { ToastSuccess } from "@/app/(client)/_components/shared/toast/success"
import { CopyIcon } from "@/app/(client)/_components/svgs/copy"


const Header = () =>{
  const user = useUserStore()
  const currentUrl = window.location.href
  const { shouldShow, handleChangeToast } = useToast()

  return (
    <header className="relative z-20 md:p-6">
      <nav className="bg-white rounded-lg p-4 flex items-center justify-between">
        <Link
          className="text-purple font-semibold border-purple h-[46px] flex items-center px-7 border rounded lg:transition-colors lg:hover:bg-light-purple"
          href="/">Back to Editor
        </Link>
        <CopyToClipboard 
          text={ `${ currentUrl.substring(0, currentUrl.lastIndexOf("/")+1) }${ user.username }`}
          onCopy={() => handleChangeToast(true)}>
          <button
            className="text-white font-semibold bg-purple h-[46px] flex items-center px-7 border rounded lg:transition-colors lg:hover:bg-purple-hover">Share Link
          </button>
        </CopyToClipboard>
      </nav>
      <AnimatePresence>
        { shouldShow && (
          <ToastSuccess message="The link has been copied to your clipboard!" >
            <CopyIcon />
          </ToastSuccess>
        ) }
      </AnimatePresence>
    </header>
  )
}


export default Header