import Link from "next/link"


const Header = () =>{

  return (
    <header className="relative z-10 md:p-6">
      <nav className="bg-white rounded-lg p-4 flex items-center justify-between">
        <Link
          className="text-purple font-semibold border-purple h-[46px] flex items-center px-7 border rounded lg:transition-colors lg:hover:bg-light-purple"
          href="/">Back to Editor
        </Link>
        <Link
          className="text-white font-semibold bg-purple h-[46px] flex items-center px-7 border rounded lg:transition-colors lg:hover:bg-purple-hover"
          href="/">Share Link
        </Link>
      </nav>
    </header>
  )
}


export default Header