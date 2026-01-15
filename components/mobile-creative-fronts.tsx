'use client'
import { useState } from 'react'
import BoomBoxSvg from './svgs/purple-svgs/body/boombox'
import DiscoballSvg from './svgs/purple-svgs/body/discoball'
import JamboxRecordsSvg from './svgs/purple-svgs/body/jambox'
import StefanieSvg from './svgs/purple-svgs/body/stefanie'

const content = {
  pt: {
    title: 'Frentes Criativas',
    paragraphs: [
      'Luísa Viscardi atua em frentes criativas que unem estratégia, arte e música. Pela JAMBOX, desenvolve projetos que fortalecem a cultura urbana, realizam bookings de DJs renomados e promovem experiências musicais inovadoras, além de idealizar a JOINT, festa consolidada desde 2022 como espaço de valorização do Hip-Hop e da boa música.',
      'Ao lado da artista Stefanie, Luísa acompanha de perto cada passo da carreira, dos lançamentos aos shows, estruturando oportunidades e estratégias que potencializam sua trajetória artística e consolidam sua presença no cenário musical.',
    ],
  },
  en: {
    title: 'Creative Fronts',
    paragraphs: [
      'Luísa Viscardi works across creative fronts that combine strategy, art, and music. Through JAMBOX, she develops projects that strengthen urban culture, manage bookings for renowned DJs, and deliver innovative musical experiences, in addition to creating JOINT, a party established in 2022 as a space dedicated to celebrating Hip-Hop and quality music.',
      'Alongside the artist Stefanie, Luísa closely oversees every step of her career, from releases to live shows, structuring opportunities and strategies that amplify her artistic trajectory and solidify her presence in the music scene.',
    ],
  },
}

const MobileCreativeFrontsSection = () => {
  const [activeTab, setActiveTab] = useState<'pt' | 'en'>('pt')

  return (
    <div className="px-14.25 py-8 mt-12">
      <div className="flex justify-between items-center mb-8">
        <h2 className="font-bento-sans font-bold text-xl text-luisa-pink text-nowrap">
          {content.pt.title}
        </h2>
        {/* Botões PT e EN */}
        <div className="flex items-center gap-2">
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
      </div>

      {/* Conteúdo */}
      <div className="space-y-6 mb-10">
        {activeTab === 'pt'
          ? content.pt.paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="text-luisa-purple font-bold text-base leading-snug text-justify font-bento-sans tracking-wide"
              >
                {paragraph}
              </p>
            ))
          : content.en.paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="text-luisa-purple text-base leading-snug text-justify font-bento-sans italic font-bold tracking-wide"
              >
                {paragraph}
              </p>
            ))}
      </div>

      {/* Footer fixo - sempre visível */}
      <div className="grid grid-cols-4 gap-4 items-center text-luisa-purple">
        <div className="col-span-2 flex justify-center">
          <StefanieSvg />
        </div>
        <div className="col-span-2 flex items-center justify-center">
          <p className="font-bento-sans font-bold">Artist Manager</p>
        </div>
      </div>

      {/* Jambox centralizado abaixo do BoomBox */}
      <div className="flex justify-center mt-8">
        <JamboxRecordsSvg />
      </div>

      <div className="flex flex-col mt-20 ">
        <div className="bg-linear-to-b relative from-transparent via-85% h-50 via-luisa-gradient-main-pink to-transparent">
          <div className="flex items-center justify-center -mt-8">
            <BoomBoxSvg />
          </div>
        </div>
      </div>

      <div className="mt-10 flex items-center justify-center">
        <DiscoballSvg />
      </div>
    </div>
  )
}

export default MobileCreativeFrontsSection
