import type { Metadata } from "next";
import "./globals.css";
import { instrument_sans } from "../_lib/utils/fonts";
import { TRPC } from "../components/trpc";


export const metadata: Metadata = {
  title: "Frontendmentor Link Sharing",
  description: "Frontendmentor Link Sharing",
}

type RootLayoutProps = Readonly<{
  children: React.ReactNode
}>

const RootLayout = ({ children }: RootLayoutProps) => {

  return (
    <html lang="en">
      <body className={`${ instrument_sans } font-instrument`}>
        {/* @ts-ignore */}
        <TRPC>
          { children }
        </TRPC>
      </body>
    </html>
  )
}


export default RootLayout