import type { Metadata } from "next"
import { VT323, Share_Tech_Mono } from "next/font/google"
import "./globals.css"

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-vt323",
})

const shareTechMono = Share_Tech_Mono({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "SOMEWHEREINLONDON",
  description: "Artwork, Music, Web",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${vt323.variable} ${shareTechMono.variable}`}>
        {children}
      </body>
    </html>
  )
}