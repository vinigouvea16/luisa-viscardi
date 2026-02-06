import { useContent } from '@/context/content-context'
import BoomBoxSvg from '../svgs/purple-svgs/body/boombox'
import DiscoballSvg from '../svgs/purple-svgs/body/discoball'
import JamboxRecordsSvg from '../svgs/purple-svgs/body/jambox'
import StefanieSvg from '../svgs/purple-svgs/body/stefanie'

export default function CreativeFronts() {
  const { content } = useContent()
  return (
    <div className="grid grid-cols-12 gap-5 2xl:px-32.5 px-10">
      <div className="col-start-3 col-span-8 flex flex-col gap-10">
        {/* Linha 1: Títulos */}
        <div className="flex gap-5">
          <div className="flex-1">
            <h2 className="font-family-souvenir xl:text-4xl 2xl:text-5xl md:text-2xl lg:text-3xl font-bold">
              {content?.frentesCriativas.titlePT}
            </h2>
          </div>
          <div className="flex-1 text-right">
            <h2 className="font-family-bento-sans font-medium xl:text-4xl 2xl:text-5xl text-3xl">
              {content?.frentesCriativas.titleEN}
            </h2>
          </div>
        </div>

        {/* Linha 2: PT | EN */}
        <div className="flex gap-5">
          <div className="flex-1">
            <p className="text-sm font-bento-sans">PT</p>
          </div>
          <div className="flex-1 text-right">
            <p className="text-sm font-bento-sans font-bold">EN</p>
          </div>
        </div>

        {/* Linha 3: Texto 1 */}
        <div className="flex gap-5 font-bento-sans font-semibold text-luisa-purple/90 tracking-wide leading-5">
          <div className="flex-1 ">
            <p>{content?.frentesCriativas.paragraph1PT}</p>
          </div>
          <div className="flex-1 italic">
            <p>{content?.frentesCriativas.paragraph1EN}</p>
          </div>
        </div>

        {/* Linha 4: Texto 2 */}
        <div className="flex gap-5 font-bento-sans font-semibold text-luisa-purple/90 tracking-wide leading-5">
          <div className="flex-1">
            <p>{content?.frentesCriativas.paragraph2PT}</p>
          </div>
          <div className="flex-1 italic">
            <p>{content?.frentesCriativas.paragraph2EN}</p>
          </div>
        </div>

        {/* Linha 5: SVGs */}
        <div className="flex gap-5 pt-10">
          <div className="flex-1 flex md:flex-col lg:flex-row items-center gap-10 font-bento-sans text-luisa-purple/90">
            <StefanieSvg />
            <p className="font-semibold text-lg tracking-wide">
              Artist Manager
            </p>
          </div>
          <div className="flex-1 flex md:flex-col lg:flex-row items-center justify-end gap-10 font-bento-sans text-luisa-purple font-medium tracking-wide">
            <p>Founder</p>
            <JamboxRecordsSvg />
          </div>
        </div>
      </div>

      {/* BoomBox e Discoball (não mexemos) */}
      <div className="col-start-3 col-span-6 mt-40">
        <div className="bg-linear-to-b from-transparent via-85% h-50 via-luisa-gradient-main-pink to-transparent">
          <div className="grid grid-cols-6 gap-5">
            <div className="col-start-4 col-span-1">
              <BoomBoxSvg />
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-2 flex justify-end mt-40">
        <DiscoballSvg />
      </div>
    </div>
  )
}
