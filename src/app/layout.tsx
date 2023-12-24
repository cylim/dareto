import { Viewport } from "next";
import "./globals.css";
import { Roboto } from "next/font/google";
import React from 'react'

const roboto = Roboto({ subsets: ["latin"], weight: ['100', '300', '400', '500', '700', '900'] });

export const metadata = {
  metadataBase: new URL('https://dareto.monify.xyz'),
  title: "Dare.to XYZ",
  description: "self challenging and make a different! Powered by ICP.",
  other: {
    'msapplication-TileColor': '#000',
  },
  openGraph: {
    type: "website",
    url: "https://dareto.monify.xyz",
    title: 'Dare.to XYZ',
    description: 'self challenging and make a different! Powered by ICP.',
    siteName: `Dare.to`,
    images: [{
      url: "/icon.png",
      type: "website",
      width: 512,
      height: 512,
    }],
  },
  twitter: {
    card: "summary_large_image",
    site: `@cylim226`,
    creator: `@cylim226`,
    images: [{
      url: "/icon.png",
    }]
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

