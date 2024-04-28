import { Instrument_Sans } from "next/font/google";


export const instrument_init = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument_sans",
  weight: ["400", "500", "600", "700"]
})

export const instrument_sans = instrument_init.variable