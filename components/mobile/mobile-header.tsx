'use client'

import { getSettings } from '@/lib/firebase/settings'
import { useEffect, useState } from 'react'

export default function HeaderMobile() {
  const [pressKitUrl, setPressKitUrl] = useState<string | null>(null)

  useEffect(() => {
    getSettings().then(settings => {
      if (settings.pressKitUrl) {
        setPressKitUrl(settings.pressKitUrl)
      }
    })
  }, [])

  return (
    <>
      {pressKitUrl ? (
        <a
          href={pressKitUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="col-span-2 col-start-11 uppercase font-bento-sans tracking-[0.15em] font-medium xl:text-xs lg:text-[10px] md:text-[8px] text-nowrap border-2 rounded-full border-luisa-pink w-fit px-3 py-2 text-luisa-purple active:bg-luisa-pink active:text-white transition-colors flex items-center justify-center max-h-7 my-auto"
        >
          download press kit
        </a>
      ) : (
        <button
          type="button"
          className="col-span-2 col-start-11 uppercase font-bento-sans tracking-[0.15em] font-medium xl:text-xs lg:text-[10px] md:text-[8px] text-nowrap border rounded-full border-dashed border-luisa-gray/30 w-fit px-3 py-2 text-luisa-gray/40 bg-luisa-gray/5 flex items-center justify-center max-h-7 my-auto"
          disabled
        >
          download press kit
        </button>
      )}
    </>
  )
}
