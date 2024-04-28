import type { Metadata } from "next";
import "./globals.css";
import { instrument_sans } from "../_lib/_utils/fonts";


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
      <body className={`${ instrument_sans } font-instrument`}>{children}</body>
    </html>
  )
}


export default RootLayout