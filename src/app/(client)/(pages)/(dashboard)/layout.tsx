import { Header } from "../../_components/layout/header"
import { Preview } from "../../_components/shared/preview"
import Hydrate from "./hydrate"


type LayoutProps = {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) =>{
 
  return (
    <Hydrate>
      <div className="bg-light-grey">
        <div className="max-w-[1680px] mx-auto">
          <Header />
          <main className="min-h-[calc(100vh-74px)] p-4 md:min-h-[calc(100vh-126px)] md:py-0 md:px-6 lg:grid lg:grid-cols-[560px,1fr] lg:gap-x-6 lg:grid-rows-[834px] lg:pb-6 lg:overflow-hidden">
            <Preview />
            { children }
          </main>
        </div>
      </div>
    </Hydrate>
  )
}


export default Layout