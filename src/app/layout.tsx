import type React from "react"
import type { Metadata } from "next"
import { El_Messiri, Epilogue } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import ScrollUp from "@/components/scroll-up"

const elMessiri = El_Messiri({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-el-messiri",
})

const epilogue = Epilogue({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-epilogue",
})

export const metadata: Metadata = {
  title: "Nathalie D. Rodriguez - UX/UI Designer",
  description:
    "Portfolio of Nathalie D. Rodriguez, UX/UI Designer with over 10 years of experience in digital communication - Develop by: Tweblabs - Leonel Fernando Jara Ravarotto",
  keywords: ["ux/ui designer", "nathalie d. rodriguez", "portfolio", "digital communication", "leonel fernando jara ravarotto", "tweblabs"],
  openGraph: {
    title: 'Nathalie D. Rodriguez - UX/UI Designer',
    description: 'Portfolio of Nathalie D. Rodriguez, UX/UI Designer with over 10 years of experience in digital communication - Develop by: Tweblabs - Leonel Fernando Jara Ravarotto',
    images: [
      {
        url: '/BannerURL.png',
        width: 1200,
        height: 630,
        alt: 'Develop by: Tweblabs - Leonel Fernando Jara Ravarotto',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" data-lt-installed="true" suppressHydrationWarning>
      <body className={`${elMessiri.variable} ${epilogue.variable} font-body`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            {children}
          <ScrollUp />
        </ThemeProvider>
      </body>
    </html>
  )
}

