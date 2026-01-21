'use client'

import { getMediaByCategory } from '@/lib/firebase/media'
import type { Media } from '@/types/admin'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import MeltedVinilSvg from './svgs/purple-svgs/body/melted-vinil'

export default function MyTunesSection() {
  const [myTunesMedia, setMyTunesMedia] = useState<Media | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadMyTunesMedia = async () => {
      const tunesMedia = await getMediaByCategory('my-tunes')
      if (tunesMedia.length > 0) {
        setMyTunesMedia(tunesMedia[0])
      }
      setLoading(false)
    }

    loadMyTunesMedia()
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-12 gap-5 2xl:px-32.5 px-10 lg:px-14.25">
        <div className="col-span-12 lg:col-start-3 lg:col-span-8 flex items-center justify-center py-20">
          <p className="text-luisa-purple animate-pulse">Carregando...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Desktop */}
      <div className="hidden lg:grid grid-cols-12 gap-5 2xl:px-32.5 px-10">
        {/* Header */}
        <div className="col-start-3 col-span-4">
          <h2 className="font-family-souvenir font-bold text-6xl text-nowrap text-luisa-pink">
            My Tunes
          </h2>
        </div>

        {/* Body - Container para esquerda e direita */}
        <div className="col-start-3 col-span-8 grid grid-cols-8 gap-5">
          {/* ESQUERDA - 4 colunas de conteúdo */}
          <div className="col-span-4 grid grid-cols-4 gap-5">
            {/* Texto PT */}
            <div className="col-span-4 flex flex-col gap-10">
              <p className="uppercase text-sm font-bold text-luisa-pink">PT</p>
              <p className="font-semibold text-luisa-purple text-lg tracking-wide">
                Do Hip-Hop à Música Brasileira, sons que cruzam décadas e
                estilos, transformando cada set em uma jornada musical.
              </p>
            </div>

            {/* Texto EN */}
            <div className="col-span-3 flex flex-col gap-10">
              <p className="uppercase text-sm font-bold text-luisa-pink">EN</p>
              <p className="italic font-semibold  text-luisa-purple text-lg tracking-wide">
                From Hip-Hop to Brazilian Music, sounds that cross decades and
                genres, turning every set into a musical journey.
              </p>
            </div>

            {/* SVG */}
            <div className="col-span-1 col-start-1 flex items-center justify-center mt-30">
              <MeltedVinilSvg />
            </div>
          </div>

          {/* DIREITA - Container relativo para posicionar gradiente e botão */}
          <div className="col-span-4 relative">
            {myTunesMedia ? (
              <>
                {/* Gradiente */}
                <div className="absolute 2xl:-bottom-25 lg:bottom-25 -left-[calc(100%/4+1.25rem)] w-full h-46.25 bg-linear-to-b from-transparent via-80% via-luisa-gradient-main-teal to-transparent pointer-events-none" />

                {/* Imagem de fundo */}
                <Image
                  alt={myTunesMedia.title || 'my tunes'}
                  src={myTunesMedia.url}
                  width={600}
                  height={800}
                  unoptimized
                  className="w-full h-fit object-cover object-center relative z-10"
                />

                {/* Botão Play - se tiver link, vira link; senão, botão desabilitado */}
                {myTunesMedia.link ? (
                  <a
                    href={myTunesMedia.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 rounded-full w-34.5 h-34.5 bg-luisa-pink flex items-center justify-center z-20 hover:opacity-90 transition-opacity"
                  >
                    <span className="text-white font-bold tracking-widest text-2xl">
                      PLAY
                    </span>
                  </a>
                ) : (
                  <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 rounded-full w-34.5 h-34.5 bg-luisa-pink/50 flex items-center justify-center z-20">
                    <span className="text-white/70 font-bold tracking-widest text-2xl">
                      PLAY
                    </span>
                  </div>
                )}
              </>
            ) : (
              <div className="w-full h-96 bg-luisa-gray/10 flex items-center justify-center">
                <p className="text-luisa-purple text-sm text-center px-4">
                  Faça upload da capa no admin
                  <br />
                  <span className="text-xs">Categoria: My Tunes</span>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="flex lg:hidden flex-col px-14.25 mt-10 mb-20">
        {/* Header */}
        <h2 className="font-family-souvenir font-bold text-3xl mb-10 text-luisa-pink">
          My Tunes
        </h2>

        {/* Body - Container para esquerda e direita */}
        <div className="grid grid-cols-4 gap-3">
          {/* Texto PT */}
          <div className="col-span-1">
            <p className="uppercase text-sm font-bold text-luisa-pink italic">
              PT
            </p>
          </div>
          <div className="col-span-3 mb-4">
            <p className="text-justify font-bold text-luisa-purple text-lg tracking-wide leading-normal">
              Do Hip-Hop à Música Brasileira, sons que cruzam décadas e estilos,
              transformando cada set em uma jornada musical.
            </p>
          </div>

          {/* Texto EN */}
          <div className="col-span-1">
            <p className="uppercase text-sm font-bold text-luisa-pink">EN</p>
          </div>
          <div className="col-span-3 mb-12">
            <p className="italic text-justify font-bold text-luisa-purple text-lg leading-normal">
              From Hip-Hop to Brazilian Music, sounds that cross decades and
              genres, turning every set into a musical journey.
            </p>
          </div>

          {/* Container para gradiente + imagem */}
          {myTunesMedia ? (
            <>
              <div className="col-span-4 grid grid-cols-4 gap-3 relative">
                {/* Imagem - 3 colunas começando na coluna 2 */}
                <div className="col-span-3 col-start-2 relative">
                  <Image
                    alt={myTunesMedia.title || 'my tunes'}
                    src={myTunesMedia.url}
                    width={204}
                    height={212}
                    unoptimized
                    className="w-full h-full object-cover relative z-10"
                  />

                  {/* Botão Play */}
                  {myTunesMedia.link ? (
                    <a
                      href={myTunesMedia.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 rounded-full w-19 h-19 bg-luisa-pink flex items-center justify-center z-20 hover:opacity-90 transition-opacity"
                    >
                      <span className="text-white font-bold tracking-widest text-sm">
                        PLAY
                      </span>
                    </a>
                  ) : (
                    <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 rounded-full w-19 h-19 bg-luisa-pink/50 flex items-center justify-center z-20">
                      <span className="text-white/70 font-bold tracking-widest text-sm">
                        PLAY
                      </span>
                    </div>
                  )}
                </div>

                {/* Gradiente */}
                <div className="col-span-3 col-start-1 relative">
                  <div className="absolute -bottom-10 left-0 w-full h-46.25 bg-linear-to-b from-transparent via-80% via-luisa-gradient-main-teal to-transparent pointer-events-none z-0" />
                </div>
              </div>

              {/* Vinil derretido - justificado à direita */}
              <div className="col-span-4 flex justify-end mt-12">
                <MeltedVinilSvg />
              </div>
            </>
          ) : (
            <div className="col-span-4 h-52 bg-luisa-gray/10 flex items-center justify-center rounded-lg">
              <p className="text-luisa-purple text-xs text-center px-4">
                Faça upload da capa
                <br />
                no admin
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
