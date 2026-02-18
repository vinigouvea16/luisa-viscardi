'use client'

import { getMediaByCategory } from '@/lib/firebase/media'
import type { Media } from '@/types/admin'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function HeroSection() {
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
      <div className="flex flex-col mt-30">
        <div className="grid grid-cols-12 gap-5 2xl:px-32.5 px-10">
          <div className="col-start-3 col-span-8 flex items-center justify-center py-40">
            <p className="text-luisa-purple animate-pulse">Carregando...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col mt-30">
      <div className="grid grid-cols-12 gap-5 2xl:px-32.5 px-10">
        <p className="col-start-7 my-10 col-span-3 font-family-souvenir font-bold text-2xl lg:text-3xl -tracking-wide uppercase">
          spreading <br />{' '}
          <span className="font-medium italic lowercase">the</span> noise
        </p>
      </div>

      {/* Textos */}
      <div className="grid grid-cols-12 gap-5 2xl:px-32.5 px-10 tracking-[0.25em] uppercase text-luisa-purple font-bento-sans font-bold text-[8px] lg:text-xs pb-0.5">
        <p className="col-span-6 text-luisa-gray">
          Luísa viscardi © 2026. all rights reserved
        </p>
        <p className="col-start-7 col-span-3">BEM-VINDX AO MEU MUNDO</p>
        <p className="col-span-3 text-right italic">WELCOME TO MY WORLD</p>
      </div>

      {/* Container com imagem de fundo e divs sobrepostas */}
      <div className="relative">
        {heroMainImage ? (
          <Image
            alt={heroMainImage.title || 'foto da dj'}
            src={heroMainImage.url}
            width={1598}
            loading="eager"
            height={532}
            unoptimized
            className="object-cover object-center w-full h-auto 2xl:pr-32.5 pr-10  brightness-90"
          />
        ) : (
          <div className="w-full pr-32.5 h-133 bg-luisa-gray/20 flex items-center justify-center">
            <p className="text-luisa-purple text-sm">
              Faça upload da imagem principal no admin
            </p>
          </div>
        )}

        {/* Divs sobrepostas - Grid de 8 colunas */}
        <div className="absolute inset-0 grid grid-cols-12 top-25 gap-5 2xl:px-32.5 px-10">
          {/* Div com gradient (4 colunas) - usando position relative + top */}
          <div className="col-start-3 col-span-4 relative top-5 bg-linear-to-b from-transparent from-60% via-95% via-luisa-gradient-main-pink to-transparent" />

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
                    className="h-119 w-123.5 object-cover"
                  />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    alt={heroOverlayGif.title || ''}
                    src={heroOverlayGif.url}
                    className="h-119 w-123.5 object-cover"
                  />
                )}
                <div className="flex justify-between mt-4 tracking-widest text-luisa-gray/80 font-bento-sans uppercase text-[8px] lg:text-xs ">
                  <p>{heroOverlayGif.title}</p>
                  {/* <p>parque villa-lobos</p> */}
                </div>
              </>
            ) : (
              <div className="h-119 w-123.5 bg-luisa-gray/10 flex items-center justify-center">
                <p className="text-luisa-purple text-xs text-center px-4">
                  Faça upload do vídeo/GIF overlay no admin
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
