'use client'
import { useContent } from '@/context/content-context'
import { useState } from 'react'
import BoomBoxSvg from './svgs/purple-svgs/body/boombox'
import DiscoballSvg from './svgs/purple-svgs/body/discoball'
import JamboxRecordsSvg from './svgs/purple-svgs/body/jambox'
import StefanieSvg from './svgs/purple-svgs/body/stefanie'

const MobileCreativeFrontsSection = () => {
  const { content, loading } = useContent()
  const [activeTab, setActiveTab] = useState<'pt' | 'en'>('pt')

  if (loading || !content) {
    return (
      <div className="px-14.25 py-8 mt-12">
        <div className="flex items-center justify-center py-20">
          <p className="text-luisa-purple animate-pulse">Carregando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="px-14.25 py-8 mt-12">
      <div className="flex justify-between items-center mb-8">
        <h2 className="font-family-bento-sans font-bold text-2xl text-luisa-pink text-nowrap">
          {activeTab === 'pt'
            ? content.frentesCriativas.titlePT
            : content.frentesCriativas.titleEN}
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
        {activeTab === 'pt' ? (
          <>
            <p className="text-luisa-purple font-bold font-family-bento-sans  text-base leading-snug text-justify font-bento-sans tracking-wide">
              {content?.frentesCriativas.paragraph1PT}
            </p>
            <p className="text-luisa-purple font-bold font-family-bento-sans  text-base leading-snug text-justify font-bento-sans tracking-wide">
              {content?.frentesCriativas.paragraph2PT}
            </p>
          </>
        ) : (
          <>
            <p className="text-luisa-purple text-base leading-snug font-family-bento-sans text-justify font-bento-sans italic font-bold tracking-wide">
              {content?.frentesCriativas.paragraph1EN}
            </p>
            <p className="text-luisa-purple text-base leading-snug font-family-bento-sans text-justify font-bento-sans italic font-bold tracking-wide">
              {content?.frentesCriativas.paragraph2EN}
            </p>
          </>
        )}
      </div>

      {/* Footer fixo - sempre visível */}
      <div className="flex justify-evenly mb-8 items-center gap-4">
        <JamboxRecordsSvg />
        <p className="font-bento-sans font-bold text-luisa-purple">Founder</p>
      </div>

      <div className="grid grid-cols-4 gap-4 items-center text-luisa-purple">
        <div className="col-span-2 flex justify-center">
          <StefanieSvg />
        </div>
        <div className="col-span-2 flex items-center justify-center">
          <p className="font-bento-sans font-bold">Artist Manager</p>
        </div>
      </div>

      {/* Jambox centralizado abaixo do BoomBox */}

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
