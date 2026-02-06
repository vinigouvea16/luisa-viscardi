'use client'

import { useContent } from '@/context/content-context'
import { getMediaByCategory } from '@/lib/firebase/media'
import type { Media } from '@/types/admin'
import { useEffect, useState } from 'react'
import VinilBoxSvg from '../svgs/purple-svgs/body/vinil-box'

export default function AboutSection() {
  const { content, loading: contentLoading } = useContent()
  const [aboutGif, setAboutGif] = useState<Media | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadAboutMedia = async () => {
      const aboutMedia = await getMediaByCategory('about-gif')
      if (aboutMedia.length > 0) {
        setAboutGif(aboutMedia[0])
      }
      setLoading(false)
    }

    loadAboutMedia()
  }, [])

  if (loading || contentLoading || !content) {
    return (
      <div className="grid grid-cols-12 gap-5 2xl:px-32.5 px-10">
        <div className="col-start-3 col-span-8 flex items-center justify-center py-20">
          <p className="text-luisa-purple animate-pulse">Carregando...</p>
        </div>
      </div>
    )
  }
  return (
    <div className="grid grid-cols-12 gap-5 2xl:px-32.5 px-10">
      {/* Coluna da imagem/vídeo */}
      <div className="col-start-3 col-span-4  font-bento-sans">
        <div className="flex flex-col">
          {aboutGif ? (
            <>
              {aboutGif.type === 'video' ? (
                <video
                  src={aboutGif.url}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-119 w-123.5 object-cover"
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  alt={aboutGif.title || ''}
                  src={aboutGif.url}
                  className="h-119 w-123.5 object-cover"
                />
              )}
              <div className="flex justify-between tracking-wide uppercase text-[8px] mt-1 lg:text-xs text-luisa-gray/70">
                <p>{aboutGif.title}</p>
                <p>centro esportivo tietê</p>
              </div>
            </>
          ) : (
            <div className="h-119 w-123.5 bg-luisa-gray/10 flex items-center justify-center">
              <p className="text-luisa-purple text-xs text-center px-4">
                Faça upload do vídeo/GIF About no admin
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Coluna dos textos */}
      <div className="col-span-4 flex flex-col xl:gap-5 gap-3">
        {/* Gradiente com VinilBox */}
        <div className="mb-10 bg-linear-to-b h-35 from-transparent via-80% via-luisa-gradient-main-teal to-transparent">
          <div className="grid grid-cols-4 xl:gap-5 gap-3">
            <div className="col-start-2 col-span-1">
              <VinilBoxSvg />
            </div>
          </div>
        </div>

        {/* Texto PT */}
        <div className="grid grid-cols-4 xl:gap-5 gap-3">
          <div className="col-span-1">
            <p className="font-bold text-xs text-luisa-pink">PT</p>
          </div>
          <div className="col-span-3 text-luisa-purple/90">
            <p className="font-family-souvenir font-medium 2xl:text-3xl text-xl 2xl:leading-8 leading-6">
              {content.about.shortTextPT}
              <br />
              <span className="text-xs">+</span>
            </p>
          </div>
        </div>

        {/* Texto EN */}
        <div className="grid grid-cols-4 xl:gap-5 gap-3">
          <div className="col-span-1">
            <p className="font-bold text-xs text-luisa-pink">EN</p>
          </div>
          <div className="col-span-3 text-luisa-purple/90">
            <p className="font-bento-sans font-medium tracking-wide italic leading-5">
              {content.about.shortTextEN}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
