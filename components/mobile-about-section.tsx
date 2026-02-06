/* eslint-disable @next/next/no-img-element */
'use client'

import { useContent } from '@/context/content-context'
import { getMediaByCategory } from '@/lib/firebase/media'
import type { Media } from '@/types/admin'
import { useEffect, useState } from 'react'
import VinilBoxSvg from './svgs/purple-svgs/body/vinil-box'

const MobileAboutSection = () => {
  const { content, loading: contentLoading } = useContent()
  const [activeTab, setActiveTab] = useState<'pt' | 'en'>('pt')
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
      <div className="flex flex-col px-14.25 mb-12">
        <div className="flex items-center justify-center py-20">
          <p className="text-luisa-purple animate-pulse">Carregando...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Seção com textos longos e tabs PT/EN */}
      <div className="px-14.25 py-8">
        {/* Títulos */}
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-family-souvenir font-bold text-3xl text-luisa-pink">
            Sobre
          </h2>
          <h2 className="font-family-bento-sans font-medium text-3xl text-luisa-pink">
            About
          </h2>
        </div>

        {/* Botões PT e EN */}
        <div className="flex justify-between items-center mb-8 mt-4">
          <button
            type="button"
            onClick={() => setActiveTab('pt')}
            className={`uppercase text-sm font-bold tracking-wider transition-colors p-2 border-2 ${
              activeTab === 'pt'
                ? 'text-white bg-luisa-pink border-luisa-pink'
                : 'text-luisa-pink bg-white border-luisa-pink'
            }`}
          >
            pt
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('en')}
            className={`uppercase text-sm font-bold tracking-wider transition-colors p-2 border-2 ${
              activeTab === 'en'
                ? 'text-white bg-luisa-pink border-luisa-pink'
                : 'text-luisa-pink bg-white border-luisa-pink'
            }`}
          >
            en
          </button>
        </div>

        {/* Conteúdo */}
        <div className="space-y-6 text-justify font-family-bento-sans font-bold">
          {activeTab === 'pt' ? (
            <>
              <p className="text-luisa-purple/80 text-base font-family-bento-sans leading-snug">
                {content.about.paragraph1PT}
              </p>
              <p className="text-luisa-purple/80 text-base font-family-bento-sans leading-snug">
                {content.about.paragraph2PT}
              </p>
              <p className="text-luisa-purple/80 text-base font-family-bento-sans leading-snug">
                {content.about.paragraph3PT}
              </p>
            </>
          ) : (
            <>
              <p className="text-luisa-purple/80 text-base font-family-bento-sans italic leading-snug">
                {content.about.paragraph1EN}
              </p>
              <p className="text-luisa-purple/80 text-base font-family-bento-sans italic leading-snug">
                {content.about.paragraph2EN}
              </p>
              <p className="text-luisa-purple/80 text-base font-family-bento-sans italic leading-snug">
                {content.about.paragraph3EN}
              </p>
            </>
          )}
        </div>
      </div>
      {/* Seção com imagem/vídeo e textos curtos */}
      <div className="flex flex-col px-14.25 mb-12">
        <div className="grid grid-cols-4 gap-3">
          {/* Imagem/Vídeo */}
          <div className="col-span-3 font-medium">
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
                      className="h-51.5 w-full object-cover object-center"
                    />
                  ) : (
                    <img
                      alt={aboutGif.title || ''}
                      src={aboutGif.url}
                      className="h-51.5 w-full object-cover object-center"
                    />
                  )}
                  <div className="flex flex-col tracking-wide uppercase text-xs text-luisa-gray/70">
                    <p>{aboutGif.title}</p>
                    <p className="text-right">centro esportivo tietê</p>
                  </div>
                </>
              ) : (
                <div className="h-51.5 w-full bg-luisa-gray/10 flex items-center justify-center">
                  <p className="text-luisa-purple text-xs text-center px-2">
                    Sem mídia
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Gradiente com VinilBox */}
          <div className="col-start-2 col-span-3 flex flex-col">
            <div className="mt-15 mb-5 bg-linear-to-b h-50 from-transparent via-80% via-luisa-gradient-main-teal to-transparent">
              <div className="flex items-center justify-center -mt-5">
                <VinilBoxSvg />
              </div>
            </div>
          </div>

          {/* Texto PT curto */}
          <div className="col-span-1">
            <p className="font-bold text-xs text-luisa-pink">PT</p>
          </div>
          <div className="col-span-3 text-luisa-purple/90 mb-6">
            <p className="font-family-souvenir font-medium text-xl text-justify leading-tight">
              {content.about.shortTextPT}
            </p>
          </div>

          {/* Texto EN curto */}
          <div className="col-span-1">
            <p className="font-bold text-xs text-luisa-pink">EN</p>
          </div>
          <div className="col-span-3 text-luisa-purple/90">
            <p className="font-medium tracking-wide text-justify leading-tight text-base italic font-family-souvenir">
              {content.about.shortTextEN}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default MobileAboutSection
