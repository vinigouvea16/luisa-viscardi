'use client'

import { getSettings } from '@/lib/firebase/settings'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import LuisaViscardiLogo from './svgs/pink-svgs/luisa-viscardi'
import HeaderSvg1 from './svgs/purple-svgs/header/header-svg1'
import HeaderSvg2 from './svgs/purple-svgs/header/header-svg2'
import HeaderSvg3 from './svgs/purple-svgs/header/header-svg3'
import HeaderSvg4 from './svgs/purple-svgs/header/header-svg4'

export default function Header() {
  const [pressKitUrl, setPressKitUrl] = useState<string | null>(null)

  useEffect(() => {
    getSettings().then(settings => {
      if (settings.pressKitUrl) {
        setPressKitUrl(settings.pressKitUrl)
      }
    })
  }, [])
  return (
    <div className="grid grid-cols-12 gap-5 2xl:px-32.5 px-14 pt-16 pb-4 bg-linear-to-b from-white via-white/40 to-transparent fixed top-0 left-0 right-0 z-20 max-w-445">
      {/* Logo - coluna 1-3 */}
      <Link
        href="/"
        scroll
        className="col-span-3 lg:col-span-2 flex items-center"
        aria-label="link to homepage"
      >
        <LuisaViscardiLogo />
      </Link>

      {/* SVGs - coluna 7-10 */}
      <div className="col-start-7 col-span-4 flex items-center gap-12">
        <HeaderSvg1 className="size-8" />
        <HeaderSvg2 className="size-8" />
        <HeaderSvg3 className="size-8" />
        <HeaderSvg4 className="size-8" />
      </div>

      {pressKitUrl ? (
        <a
          href={pressKitUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="col-span-2 col-start-11 uppercase font-bento-sans tracking-[0.15em] font-medium xl:text-xs lg:text-[10px] md:text-[8px] text-nowrap border rounded-full border-luisa-pink w-fit px-3 py-1 text-luisa-purple hover:bg-luisa-pink/80 hover:shadow-lg hover:text-white transition-colors flex items-center justify-center max-h-6 my-auto"
        >
          download press kit
        </a>
      ) : (
        <button
          type="button"
          className="col-span-2 col-start-11 uppercase font-bento-sans tracking-[0.15em] font-medium xl:text-xs lg:text-[10px] md:text-[8px] text-nowrap border rounded-full border-luisa-pink/50 w-fit px-3 py-1 text-luisa-purple/50 cursor-not-allowed flex items-center justify-center max-h-6 my-auto"
          disabled
        >
          download press kit
        </button>
      )}
    </div>
  )
}
