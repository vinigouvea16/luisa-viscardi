import type { Metadata } from 'next'
import { Geist, Geist_Mono, Outfit } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'
import { AuthProvider } from '@/components/auth-provider'

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
      path: './fonts/Bento sans/BentonSans-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/Bento sans/BentonSans-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/Bento sans/BentonSans-Italic.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: './fonts/Bento sans/BentonSans-BoldItalic.ttf',
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
  description: 'Spreading the noise',
  openGraph: {
    title: 'Luísa Viscardi',
    description: 'Spreading the noise',
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
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
