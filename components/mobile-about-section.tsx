/* eslint-disable @next/next/no-img-element */
'use client'

import { getMediaByCategory } from '@/lib/firebase/media'
import type { Media } from '@/types/admin'
import { useEffect, useState } from 'react'
import VinilBoxSvg from './svgs/purple-svgs/body/vinil-box'

const content = {
  pt: {
    title: 'Sobre',
    paragraphs: [
      'A relação de Luísa Viscardi com a música e a arte vai muito além dos palcos. DJ, produtora musical e empresária, ela une música e moda como formas complementares de expressão, criando uma identidade artística única. Seu estilo freestyle permite transitar entre gêneros e décadas com liberdade, trazendo energia e personalidade a cada set.',
      'Fundadora da JAMBOX, Luísa é responsável pelo desenvolvimento de projetos focados na cultura urbana, agenciando artistas brasileiros e realizando bookings de DJs internacionais no Brasil, além de promover experiências musicais inovadoras. É também uma das idealizadoras da JOINT, festa que desde 2022 se consolidou como referência na valorização do Hip-Hop e da boa música.',
      'Ao longo de sua carreira, Luísa se apresentou em grandes festivais e eventos, incluindo The Town, MITA Festival, Rock The Mountain, Baile da Vogue, Ensaios da Anitta, Réveillon dos Milagres e Nômade Festival, além de eventos de marcas globais como Adidas x Gucci, Google, Mercedes-Benz, Sephora, Netflix e Red Bull. Internacionalmente, levou sua música para países como Nova Zelândia, Austrália, Bahamas, Espanha, Itália, Inglaterra, Estados Unidos, Portugal e Maldivas.',
    ],
  },
  en: {
    title: 'About',
    paragraphs: [
      "Luísa Viscardi's connection with music and art goes far beyond the stage. As a DJ, music producer, and entrepreneur, she combines music and fashion as complementary forms of expression, creating a unique artistic identity. Her freestyle approach allows her to move freely across genres and decades, delivering sets full of energy and personality.",
      'Founder of JAMBOX, Luísa develops projects focused on urban culture, managing Brazilian artists and handling bookings for international DJs in Brazil, while creating innovative musical experiences. She is also one of the creators of JOINT, a party that has been a reference in celebrating Hip-Hop and quality music since 2022.',
      'Throughout her career, Luísa has performed at major festivals and events, including The Town, MITA Festival, Rock The Mountain, Baile da Vogue, Ensaios da Anitta, Réveillon dos Milagres, and Nômade Festival, as well as events for global brands such as Adidas x Gucci, Google, Mercedes-Benz, Sephora, Netflix, and Red Bull. Internationally, she has brought her music to countries including New Zealand, Australia, the Bahamas, Spain, Italy, England, the United States, Portugal, and the Maldives.',
    ],
  },
}

const MobileAboutSection = () => {
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

  return (
    <>
      {/* Seção com textos longos e tabs PT/EN */}
      <div className="px-14.25 py-8">
        {/* Títulos */}
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-family-souvenir font-bold text-3xl text-luisa-pink">
            {content.pt.title}
          </h2>
          <h2 className="font-family-souvenir font-medium text-3xl text-luisa-pink">
            {content.en.title}
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
          {activeTab === 'pt'
            ? content.pt.paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-luisa-purple/80 text-base font-family-bento-sans leading-snug"
                >
                  {paragraph}
                </p>
              ))
            : content.en.paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-luisa-purple/80 text-base font-family-bento-sans italic leading-snug"
                >
                  {paragraph}
                </p>
              ))}
        </div>
      </div>
      {/* Seção com imagem/vídeo e textos curtos */}
      <div className="flex flex-col px-14.25 mb-12">
        <div className="grid grid-cols-4 gap-3">
          {/* Imagem/Vídeo */}
          <div className="col-span-3 font-medium">
            <div className="flex flex-col">
              {loading ? (
                <div className="h-51.5 w-full bg-luisa-gray/10 flex items-center justify-center">
                  <p className="text-luisa-purple text-xs animate-pulse">
                    Carregando...
                  </p>
                </div>
              ) : aboutGif ? (
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
          <div className="col-span-3 text-luisa-purple/90">
            <p className="font-family-souvenir font-medium text-xl text-justify leading-tight">
              Do Hip-Hop à Música Brasileira, passando por Funk, House, Pop e
              Soul, Luísa mistura ritmos e eras com liberdade e inovação,
              criando experiências sonoras que atravessam décadas e envolvem
              gerações.
            </p>
          </div>

          {/* Texto EN curto */}
          <div className="col-span-1">
            <p className="font-bold text-xs text-luisa-pink">EN</p>
          </div>
          <div className="col-span-3 text-luisa-purple/90">
            <p className="font-medium tracking-wide text-justify leading-tight text-base italic font-family-souvenir">
              From Hip-Hop to Brazilian Music, spanning Funk, House, Pop, and
              Soul, Luísa blends rhythms and eras with freedom and innovation,
              creating sonic experiences that cross decades and captivate
              generations.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default MobileAboutSection
