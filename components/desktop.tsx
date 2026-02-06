import * as ClienteLogos from '@/components/svgs/purple-svgs/clients'
import AboutSection from './desktop/about-gif-section'
import DesktopAboutSection from './desktop/about-section'
import AgendaSection from './desktop/agenda-section'
import CreativeFronts from './desktop/creative-fronts'
import FooterDesktop from './desktop/footer'
import HeroSection from './desktop/hero-section'
import Header from './header'
import MyTunesSection from './my-tunes'
import FromPastToFutureSvg from './svgs/pink-svgs/huge-svg'

export default function DesktopPage() {
  return (
    <main className="lg:flex flex-col xl:space-y-40 space-y-20 my-auto text-luisa-pink max-w-445">
      <Header />

      <HeroSection />

      {/* ABOUT */}
      <DesktopAboutSection />
      {/* gif */}
      <AboutSection />

      {/* frentes criativas */}
      <CreativeFronts />

      <MyTunesSection />

      <AgendaSection />

      {/* svg grande */}
      <div className="grid grid-cols-12 2xl:px-32.5 px-10 my-25">
        <FromPastToFutureSvg className="col-span-8 col-start-3" />
      </div>

      {/* clientes */}
      <div className="grid grid-cols-12 2xl:px-32.5 px-10">
        {/* Header com títulos */}
        <div className="col-start-3 col-span-8 flex justify-between">
          <div className="flex flex-col gap-10">
            <p className="font-family-souvenir font-bold lg:text-6xl text-5xl">
              Clientes
            </p>
            <p className="uppercase text-sm ">pt</p>
          </div>
          <div className="flex flex-col text-right font-bento-sans gap-10">
            <p className="lg:text-6xl text-5xl">Clients</p>
            <p className="uppercase text-sm font-bold">en</p>
          </div>
        </div>

        {/* Grid de logos - mesma posição de colunas */}

        <div className="col-start-3 col-span-8 mt-32.5">
          {/* Linha 1 - 6 logos */}
          <div className="flex items-center justify-between gap-8 mb-12">
            <ClienteLogos.LollaSvg className="max-w-20" />
            <ClienteLogos.ChanelSvg className="max-w-20" />
            <ClienteLogos.SpotifyWideSvg className="max-w-28 " />
            <ClienteLogos.HeinekenSvg className="max-w-24" />
            <ClienteLogos.NetflixSvg className="max-w-24 " />
            <ClienteLogos.GoogleSvg className="max-w-28 " />
          </div>

          {/* Linha 2 - 6 logos */}
          <div className="flex items-center justify-between gap-8 mb-12">
            <ClienteLogos.VogueSvg className="max-w-24" />
            <ClienteLogos.SamsungSvg className="max-w-30  mt-4" />
            <ClienteLogos.DoveSvg className="max-w-24" />
            <ClienteLogos.MercedesBenzSvg className="max-w-24" />
            <ClienteLogos.GucciSvg className="max-w-16 " />
            <ClienteLogos.CocaColaSvg className="max-w-28" />
          </div>

          {/* Linha 3 - 6 logos */}
          <div className="flex items-center justify-between gap-8 mb-12">
            <ClienteLogos.AmazonSvg className="max-w-24" />
            <ClienteLogos.ForbesSvg className="max-w-24" />
            <ClienteLogos.SephoraSvg className="max-w-32 " />
            <ClienteLogos.FendiSvg className="max-w-22" />
            <ClienteLogos.BudweiserSvg className="max-w-36" />
            <ClienteLogos.YoutubeSvg className="max-w-14" />
          </div>

          {/* Linha 4 - 6 logos */}
          <div className="flex items-center justify-between gap-16">
            <ClienteLogos.SohoSvg className="max-w-24" />
            <ClienteLogos.JazzMansionSvg className="max-w-20" />
            <ClienteLogos.ReveillonDosMilagresSvg className="max-w-16" />
            <ClienteLogos.ReveillonCarneirosSvg className="max-w-16" />
            <ClienteLogos.EnsaiosSvg className="max-w-22" />
            <ClienteLogos.HeavyHouseSvg className="max-w-34" />
          </div>
        </div>
      </div>

      {/* contact */}
      <div className="grid grid-cols-12 2xl:px-32.5 px-10">
        <div className="col-start-3 col-span-8 flex justify-between">
          <div className="flex flex-col gap-10">
            <p className="font-family-souvenir font-bold lg:text-6xl text-5xl">
              Contato &
            </p>
            <p className="uppercase text-sm">pt</p>
          </div>
          <div className="flex flex-col text-right font-family-bento-sans  gap-10">
            <p className="lg:text-6xl text-5xl">Social</p>
            <p className="uppercase text-sm font-bold">en</p>
          </div>
        </div>
        <div className="col-start-3 col-span-8 flex justify-between h-75 bg-linear-to-b from-transparent from-50% via-90% via-luisa-gradient-main-teal to-transparent" />
      </div>

      {/* footer */}
      <FooterDesktop />
    </main>
  )
}
