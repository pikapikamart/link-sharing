import { LayoutProps } from "@/types/utils"



const Layout = ({ children }: LayoutProps) =>{
 
  return (
    <main className="bg-light-grey p-8 min-h-screen">
      { children }
    </main>
  )
}


export default Layout