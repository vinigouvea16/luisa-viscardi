import { useContent } from '@/context/content-context'

export default function DesktopAboutSection() {
  const { content } = useContent()
  return (
    <div className="grid grid-cols-12 gap-5 2xl:px-32.5 px-10">
      {/* Div (PT)*/}
      <div className="col-start-3 space-y-10 col-span-4 font-bold  font-bento-sans">
        <div className="flex flex-col gap-2 ">
          <h2 className="mb-2 font-family-souvenir text-4xl">Sobre</h2>
          <p className="text-sm mb-1">PT</p>
        </div>
        <div className="flex flex-col space-y-20 font-family-bento-sans text-luisa-purple/90 tracking-wide leading-5">
          <p className="">{content?.about.paragraph1PT}</p>
          <p className="mt-1">{content?.about.paragraph2PT}</p>
          <p className="">{content?.about.paragraph3PT}</p>
        </div>
      </div>

      {/* Div (EN)*/}
      <div className="col-span-4 space-y-10  font-bento-sans ">
        <div className="flex flex-col gap-2 ">
          <h2 className="mb-2 text-4xl text-right">About</h2>
          <p className="text-sm mb-1 text-right">EN</p>
        </div>
        <div className="flex flex-col space-y-20 italic text-luisa-purple/90 font-family-bento-sans font-bold tracking-wide leading-5">
          <p className="">{content?.about.paragraph1EN}</p>
          <p className="">{content?.about.paragraph2EN}</p>
          <p className="mt-5">{content?.about.paragraph3EN}</p>
        </div>
      </div>
    </div>
  )
}
