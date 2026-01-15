/* eslint-disable @next/next/no-img-element */
'use client'

import { getMediaByCategory } from '@/lib/firebase/media'
import type { Media } from '@/types/admin'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import LuisaViscardiLogo from '../svgs/pink-svgs/luisa-viscardi'
import HeaderSvg1 from '../svgs/purple-svgs/header/header-svg1'
import HeaderSvg2 from '../svgs/purple-svgs/header/header-svg2'
import HeaderSvg3 from '../svgs/purple-svgs/header/header-svg3'
import HeaderSvg4 from '../svgs/purple-svgs/header/header-svg4'

export default function HeroSectionMobile() {
  const [heroMainImage, setHeroMainImage] = useState<Media | null>(null)
  const [heroOverlayGif, setHeroOverlayGif] = useState<Media | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadHeroMedia = async () => {
      const mainImages = await getMediaByCategory('hero-main')
      if (mainImages.length > 0) {
        setHeroMainImage(mainImages[0])
      }

      const overlayGifs = await getMediaByCategory('hero-overlay')
      if (overlayGifs.length > 0) {
        setHeroOverlayGif(overlayGifs[0])
      }

      setLoading(false)
    }

    loadHeroMedia()
  }, [])

  if (loading) {
    return (
      <div className="flex flex-col h-[80vh] mt-30">
        <div className="flex items-center justify-center h-full">
          <p className="text-luisa-purple animate-pulse">Carregando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-[80vh] mt-30">
      {/* logos */}
      <div className="flex flex-col mx-14.25 mb-8">
        <div className="flex items-center w-full justify-between">
          <HeaderSvg1 className="size-8" />
          <HeaderSvg2 className="size-8" />
          <HeaderSvg3 className="size-10" />
          <HeaderSvg4 className="size-10" />
        </div>
        <LuisaViscardiLogo className="w-full mt-10" />
        <p className="mt-10 mb-6 font-souvenir text-luisa-pink font-bold text-3xl mx-auto -tracking-wide uppercase ">
          spreading <br />{' '}
          <span className="font-medium italic lowercase">the</span> noise
        </p>
      </div>

      {/* foto + gif */}
      <div className="flex flex-col">
        <p className="italic text-xs text-luisa-purple tracking-widest font-bento-sans mx-auto font-bold uppercase mb-6">
          welcome to my world
        </p>
        <p className="text-luisa-gray/70 uppercase tracking-widest ml-2 text-xs">
          Luísa viscardi © 2025. all rights reserved
        </p>

        <div className="relative">
          {/* Imagem da DJ (fundo) */}
          {heroMainImage ? (
            <Image
              alt={heroMainImage.title || 'foto da dj'}
              src={heroMainImage.url}
              width={343}
              height={114}
              unoptimized
              className="object-cover object-right w-full pr-10.25 h-28.5 brightness-90"
            />
          ) : (
            <div className="w-full pr-10.25 h-28.5 bg-luisa-gray/20 flex items-center justify-center">
              <p className="text-luisa-purple text-xs">Sem imagem</p>
            </div>
          )}

          {/* Divs sobrepostas - Grid de 7 colunas */}
          <div className="absolute inset-0 grid grid-cols-7 top-15 gap-0 px-14.25">
            {/* Div com gradient (3 colunas) */}
            <div className="col-span-3 relative top-3 bg-linear-to-b from-transparent from-60% via-95% via-luisa-gradient-main-pink to-transparent" />

            {/* Div com imagem e textos (4 colunas) */}
            <div className="col-span-4 flex flex-col">
              {heroOverlayGif ? (
                <>
                  {heroOverlayGif.type === 'video' ? (
                    <video
                      src={heroOverlayGif.url}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="h-39.5 w-full object-cover"
                    />
                  ) : (
                    <img
                      alt={heroOverlayGif.title || ''}
                      src={heroOverlayGif.url}
                      className="h-39.5 w-full object-cover"
                    />
                  )}
                  <div className="flex flex-col mt-1 gap-1 text-luisa-gray/50 uppercase text-xs">
                    <p className="text-left">{heroOverlayGif.title}</p>
                    <p className="text-right">parque villa-lobos</p>
                  </div>
                </>
              ) : (
                <div className="h-39.5 w-full bg-luisa-gray/10 flex items-center justify-center">
                  <p className="text-luisa-purple text-xs">Sem vídeo/GIF</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
