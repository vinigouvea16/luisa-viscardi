import type { Metadata } from 'next'
import { Geist, Geist_Mono, Outfit } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'
import { AuthProvider } from '@/context/auth-provider'
import { ContentProvider } from '@/context/content-context'

const outfit = Outfit({ subsets: ['latin'], variable: '--font-sans' })

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const bentoSans = localFont({
  src: [
    {
      path: './fonts/Metrik/Metrik-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/Metrik/Metrik-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/Metrik/Metrik-Bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/Metrik/Metrik-Italic.otf',
      weight: '400',
      style: 'italic',
    },
    {
      path: './fonts/Metrik/Metrik-Medium-Italic.otf',
      weight: '500',
      style: 'italic',
    },
    {
      path: './fonts/Metrik/Metrik-Bold-Italic.otf',
      weight: '700',
      style: 'italic',
    },
  ],
  variable: '--font-bento-sans',
  display: 'swap',
  preload: true,
})

const souvenir = localFont({
  src: [
    {
      path: './fonts/Souvenir/SouvenirStd-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/Souvenir/SouvenirStd-MediumItalic.otf',
      weight: '500',
      style: 'italic',
    },
    {
      path: './fonts/Souvenir/SouvenirStd-Demi.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: './fonts/Souvenir/SouvenirStd-Bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-souvenir',
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  title: 'Luísa Viscardi',
  description: 'Crafting live experiences',
  openGraph: {
    title: 'Luísa Viscardi',
    description: 'Crafting live experiences',
    url: 'https://https://luisa-viscardi.vercel.app/',
    images: [
      {
        url: 'https://luisa-viscardi.vercel.app/luisametadataimg.png',
        width: 1200,
        height: 632,
        alt: 'Luísa Viscardi',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Luísa Viscardi',
    images: {
      url: 'https://luisa-viscardi.vercel.app/luisametadataimg.png',
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      data-scroll-behavior="smooth"
      lang="en"
      className={`${outfit.variable} ${bentoSans.variable} ${souvenir.variable}`}
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <ContentProvider>
          <AuthProvider>{children}</AuthProvider>
        </ContentProvider>
      </body>
    </html>
  )
}
