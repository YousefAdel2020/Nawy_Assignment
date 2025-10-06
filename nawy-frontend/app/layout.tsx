import type React from "react"
import type { Metadata } from "next/core"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Header } from "@/components/header"
import { HydrationCleanup } from "@/components/hydration-cleanup"
import "./globals.css"

export const metadata: Metadata = {
  title: "Nawy",
  description: "Browse available apartments",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body 
        className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <HydrationCleanup />
        <Header />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
