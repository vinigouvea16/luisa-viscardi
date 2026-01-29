import * as ClienteLogos from '@/components/svgs/purple-svgs/clients'
import MobileAboutSection from './mobile-about-section'
import MobileCreativeFrontsSection from './mobile-creative-fronts'
import HeroSectionMobile from './mobile/hero-section'
import AgendaSectionMobile from './mobile/mobile-agenda-section'
import MyTunesSection from './my-tunes'
import FooterSvg1 from './svgs/pink-svgs/footer/footer-svg1'
import FooterSvg2 from './svgs/pink-svgs/footer/footer-svg2'
import FooterSvg3 from './svgs/pink-svgs/footer/footer-svg3'
import HamburgerMenuSvg from './svgs/pink-svgs/hamburger-menu'
import FromPastToFutureSvg from './svgs/pink-svgs/huge-svg'
import FacebookSvg from './svgs/socials/facebook'
import InstagramSvg from './svgs/socials/instagram'
import SoundCloudSvg from './svgs/socials/soundcloud'
import SpotifySvg from './svgs/socials/spotify'
import TikTokSvg from './svgs/socials/tiktok'
import YouTubeSvg from './svgs/socials/youtube'

export default function MobilePage() {
  const logosOrdenados = [
    ClienteLogos.LollaSvg,
    ClienteLogos.ChanelSvg,
    ClienteLogos.SpotifyWideSvg,
    ClienteLogos.BudweiserSvg,
    ClienteLogos.HeavyHouseSvg,
    ClienteLogos.VogueSvg,
    ClienteLogos.SamsungSvg,
    ClienteLogos.MercedesBenzSvg,
    ClienteLogos.GoogleSvg,
    ClienteLogos.GucciSvg,
    ClienteLogos.CocaColaSvg,
    ClienteLogos.AmazonMusicSvg,
    ClienteLogos.ForbesSvg,
    ClienteLogos.HeinekenSvg,
    ClienteLogos.SephoraSvg,
    ClienteLogos.NetflixSvg,
    ClienteLogos.JazzMansionSvg,
    ClienteLogos.ReveillonDosMilagresSvg,
    ClienteLogos.ReveillonCarneirosSvg,
    ClienteLogos.GlamuramaSvg,
    ClienteLogos.BigTikTokSvg,
  ]

  return (
    <main className="flex flex-col lg:hidden">
      {/* header */}
      <div className="fixed pt-12 w-full pb-10 mx-auto flex items-center justify-center bg-linear-to-b from-white via-white/40 to-transparent z-50">
        <button
          type="button"
          className="uppercase font-bento-sans tracking-[0.15em] font-medium xl:text-xs md:text-[8px] text-nowrap border rounded-full border-luisa-pink w-fit px-3 py-1 text-luisa-purple hover:bg-luisa-pink/80 hover:text-white flex items-center justify-center max-h-6 my-auto hover:shadow-lg"
          disabled
        >
          download press kit
        </button>
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
      <div className="flex flex-col gap-8  px-14.25 mb-20" id="footer">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between w-full">
            <a
              target="blank"
              rel="noreferrer"
              href="https://www.instagram.com/luisaviscardi/"
            >
              <InstagramSvg />
            </a>

            <a
              target="blank"
              rel="noreferrer"
              href="https://www.tiktok.com/@luisa.viscardi"
            >
              <TikTokSvg />
            </a>

            <a
              target="blank"
              rel="noreferrer"
              href="https://soundcloud.com/luisaviscardi"
            >
              <SoundCloudSvg />
            </a>
          </div>
          <div className="flex items-center justify-between w-full">
            <a
              target="blank"
              rel="noreferrer"
              href="https://open.spotify.com/artist/5crcFRnnfwZTcGybeH6OH3?si=V5TaScr5R0qOUcfqWsOd5Q"
            >
              <SpotifySvg />
            </a>

            <a
              target="blank"
              rel="noreferrer"
              href="https://www.facebook.com/djluisaviscardi/"
            >
              <FacebookSvg />
            </a>

            <a
              target="blank"
              rel="noreferrer"
              href="https://www.youtube.com/viscardilu"
            >
              <YouTubeSvg />
            </a>
          </div>
        </div>

        <p className="font-family-souvenir text-center mx-auto text-luisa-pink uppercase ">
          spreading <br />
          the noise
        </p>
        <div className="flex items-center justify-between w-3/4 mx-auto">
          <FooterSvg1 className="max-w-9" />
          <FooterSvg2 className="max-w-9" />
          <FooterSvg3 className="max-w-9" />
        </div>
      </div>
    </main>
  )
}
