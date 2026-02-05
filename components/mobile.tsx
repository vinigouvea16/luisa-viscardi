import * as ClienteLogos from '@/components/svgs/purple-svgs/clients'
import MobileAboutSection from './mobile-about-section'
import MobileCreativeFrontsSection from './mobile-creative-fronts'
import HeroSectionMobile from './mobile/hero-section'
import AgendaSectionMobile from './mobile/mobile-agenda-section'
import FooterMobile from './mobile/mobile-footer'
import HeaderMobile from './mobile/mobile-header'
import MyTunesSection from './my-tunes'
import FromPastToFutureSvg from './svgs/pink-svgs/huge-svg'

export default function MobilePage() {
  return (
    <main className="flex flex-col lg:hidden">
      {/* header */}
      <div className="fixed pt-12 w-full pb-10 mx-auto flex items-center justify-center bg-linear-to-b from-white via-white/40 to-transparent z-50">
        <HeaderMobile />
      </div>

      <HeroSectionMobile />

      {/* about */}
      <MobileAboutSection />

      {/* creative fronts */}
      <MobileCreativeFrontsSection />

      <MyTunesSection />

      <AgendaSectionMobile />

      {/* big svg */}
      <div className="flex px-14.25 h-[70vh]">
        <FromPastToFutureSvg className="w-full h-fit my-auto" />
      </div>

      {/* clients */}
      <div className="grid grid-cols-4 px-14.25 mb-20">
        {/* Header com títulos */}
        <div className="col-span-4 flex justify-between items-center text-luisa-pink">
          <p className="font-family-souvenir font-bold text-2xl">Clientes</p>
          <p className="text-2xl">Clients</p>
        </div>

        {/* Grid de logos - mesma posição de colunas */}
        <div className="col-span-4 mt-12">
          {/* Linha 1 - 3 logos */}
          <div className="flex items-center justify-between gap-4 mb-8">
            <ClienteLogos.LollaSvg className="max-w-14" />
            <ClienteLogos.ChanelSvg className="max-w-14" />
            <ClienteLogos.SpotifyWideSvg className="max-w-20" />
          </div>

          {/* Linha 2 - 3 logos */}
          <div className="flex items-center justify-between gap-4 mb-8">
            <ClienteLogos.HeinekenSvg className="max-w-16" />
            <ClienteLogos.NetflixSvg className="max-w-16" />
            <ClienteLogos.GoogleSvg className="max-w-20" />
          </div>

          {/* Linha 3 - 3 logos */}
          <div className="flex items-center justify-between gap-4 mb-8">
            <ClienteLogos.VogueSvg className="max-w-16" />
            <ClienteLogos.SamsungSvg className="max-w-20" />
            <ClienteLogos.DoveSvg className="max-w-16" />
          </div>

          {/* Linha 4 - 3 logos */}
          <div className="flex items-center justify-between gap-4 mb-8">
            <ClienteLogos.MercedesBenzSvg className="max-w-16" />
            <ClienteLogos.GucciSvg className="max-w-12" />
            <ClienteLogos.CocaColaSvg className="max-w-20" />
          </div>

          {/* Linha 5 - 3 logos */}
          <div className="flex items-center justify-between gap-4 mb-8">
            <ClienteLogos.AmazonSvg className="max-w-16" />
            <ClienteLogos.ForbesSvg className="max-w-16" />
            <ClienteLogos.SephoraSvg className="max-w-22" />
          </div>

          {/* Linha 6 - 3 logos */}
          <div className="flex items-center justify-between gap-4 mb-8">
            <ClienteLogos.FendiSvg className="max-w-14" />
            <ClienteLogos.BudweiserSvg className="max-w-24" />
            <ClienteLogos.YoutubeSvg className="max-w-10" />
          </div>

          {/* Linha 7 - 3 logos */}
          <div className="flex items-center justify-between gap-4 mb-8">
            <ClienteLogos.SohoSvg className="max-w-16" />
            <ClienteLogos.JazzMansionSvg className="max-w-14" />
            <ClienteLogos.ReveillonDosMilagresSvg className="max-w-12" />
          </div>

          {/* Linha 8 - 3 logos */}
          <div className="flex items-center justify-between gap-4">
            <ClienteLogos.ReveillonCarneirosSvg className="max-w-12" />
            <ClienteLogos.EnsaiosSvg className="max-w-14" />
            <ClienteLogos.HeavyHouseSvg className="max-w-24" />
          </div>
        </div>
      </div>

      {/* contact */}
      <div className="grid grid-cols-4 px-14.25 text-luisa-pink mb-12">
        <div className="col-span-4 flex justify-between">
          <p className="font-family-souvenir font-bold text-2xl">Contato &</p>
          <p className="text-2xl font-family-bento-sans">Social</p>
        </div>
        <div className="col-span-4 flex justify-between h-36.25 bg-linear-to-b from-transparent from-20% via-90% via-luisa-gradient-main-teal to-transparent" />
      </div>

      {/* footer */}
      <FooterMobile />
    </main>
  )
}
