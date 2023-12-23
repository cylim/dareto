import { Viewport } from "next";
import "./globals.css";
import { Roboto } from "next/font/google";
import React from 'react'

const roboto = Roboto({ subsets: ["latin"], weight: ['100', '300', '400', '500', '700', '900'] });

export const metadata = {
  title: "Dareto",
  description: "self challenging and make a different! Powered by ICP.",
  other: {
      'msapplication-TileColor': '#000',
    }
};

export default async function Root({
  children,
}: {
  children: React.ReactElement
}) {

  return (
    <html lang="en">
      <body className={roboto.className}>
        {children}
      </body>
    </html>
  )
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'black' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  colorScheme: 'dark',
}

