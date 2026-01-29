import * as ClienteLogos from '@/components/svgs/purple-svgs/clients'
import AboutSection from './desktop/about-gif-section'
import AgendaSection from './desktop/agenda-section'
import HeroSection from './desktop/hero-section'
import Header from './header'
import MyTunesSection from './my-tunes'
import FooterSvg1 from './svgs/pink-svgs/footer/footer-svg1'
import FooterSvg2 from './svgs/pink-svgs/footer/footer-svg2'
import FooterSvg3 from './svgs/pink-svgs/footer/footer-svg3'
import FromPastToFutureSvg from './svgs/pink-svgs/huge-svg'
import BoomBoxSvg from './svgs/purple-svgs/body/boombox'
import DiscoballSvg from './svgs/purple-svgs/body/discoball'
import JamboxRecordsSvg from './svgs/purple-svgs/body/jambox'
import StefanieSvg from './svgs/purple-svgs/body/stefanie'
import FacebookSvg from './svgs/socials/facebook'
import InstagramSvg from './svgs/socials/instagram'
import SoundCloudSvg from './svgs/socials/soundcloud'
import SpotifySvg from './svgs/socials/spotify'
import TikTokSvg from './svgs/socials/tiktok'
import YouTubeSvg from './svgs/socials/youtube'

export default function DesktopPage() {
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
    <main className="lg:flex flex-col xl:space-y-40 space-y-20 my-auto text-luisa-pink max-w-445">
      <Header />

      <HeroSection />

      {/* ABOUT */}
      <div className="grid grid-cols-12 gap-5 2xl:px-32.5 px-10 mt-50 lg:mt-20 xl:mt-0">
        {/* Div (PT)*/}
        <div className="col-start-3 space-y-10 col-span-4 font-bold  font-bento-sans">
          <div className="flex flex-col gap-2 ">
            <h2 className="mb-2 font-family-souvenir text-4xl">Sobre</h2>
            <p className="text-sm mb-1">PT</p>
          </div>
          <div className="flex flex-col space-y-20 font-family-bento-sans text-luisa-purple/90 tracking-wide leading-5">
            <p className="">
              A relação de Luísa Viscardi com a música e a arte vai muito além
              dos palcos. DJ, produtora musical e empresária, ela une música e
              moda como formas complementares de expressão, criando uma
              identidade artística única. Seu estilo freestyle permite transitar
              entre gêneros e décadas com liberdade, trazendo energia e
              personalidade a cada set.
            </p>
            <p className="mt-1">
              Fundadora da JAMBOX, Luísa é responsável pelo desenvolvimento de
              projetos focados na cultura urbana, agenciando artistas
              brasileiros e realizando bookings de DJs internacionais no Brasil,
              além de promover experiências musicais inovadoras. É também uma
              das idealizadoras da JOINT, festa que desde 2022 se consolidou
              como referência na valorização do Hip-Hop e da boa música.
            </p>
            <p className="">
              Ao longo de sua carreira, Luísa se apresentou em grandes festivais
              e eventos, incluindo The Town, MITA Festival, Rock The Mountain,
              Baile da Vogue, Ensaios da Anitta, Réveillon dos Milagres e Nômade
              Festival, além de eventos de marcas globais como Adidas x Gucci,
              Google, Mercedes-Benz, Sephora, Netflix e Red Bull.
              Internacionalmente, levou sua música para países como Nova
              Zelândia, Austrália, Bahamas, Espanha, Itália, Inglaterra, Estados
              Unidos, Portugal e Maldivas.
            </p>
          </div>
        </div>

        {/* Div (EN)*/}
        <div className="col-span-4 space-y-10  font-bento-sans ">
          <div className="flex flex-col gap-2 ">
            <h2 className="mb-2 text-4xl text-right">About</h2>
            <p className="text-sm mb-1 text-right">EN</p>
          </div>
          <div className="flex flex-col space-y-20 italic text-luisa-purple/90 font-family-bento-sans font-bold tracking-wide leading-5">
            <p className="">
              Luísa Viscardi’s connection with music and art goes far beyond the
              stage. As a DJ, music producer, and entrepreneur, she combines
              music and fashion as complementary forms of expression, creating a
              unique artistic identity. Her freestyle approach allows her to
              move freely across genres and decades, delivering sets full of
              energy and personality.
            </p>
            <p className="">
              Founder of JAMBOX, Luísa develops projects focused on urban
              culture, managing Brazilian artists and handling bookings for
              international DJs in Brazil, while creating innovative musical
              experiences. She is also one of the creators of JOINT, a party
              that has been a reference in celebrating Hip-Hop and quality music
              since 2022.
            </p>
            <p className="mt-5">
              Throughout her career, Luísa has performed at major festivals and
              events, including The Town, MITA Festival, Rock The Mountain,
              Baile da Vogue, Ensaios da Anitta, Réveillon dos Milagres, and
              Nômade Festival, as well as events for global brands such as
              Adidas x Gucci, Google, Mercedes-Benz, Sephora, Netflix, and Red
              Bull. Internationally, she has brought her music to countries
              including New Zealand, Australia, the Bahamas, Spain, Italy,
              England, the United States, Portugal, and the Maldives.
            </p>
          </div>
        </div>
      </div>
      {/* gif */}
      <AboutSection />

      {/* frentes criativas */}
      <div className="grid grid-cols-12 gap-5 2xl:px-32.5 px-10">
        <div className="col-start-3 col-span-8 flex flex-col gap-10">
          {/* Linha 1: Títulos */}
          <div className="flex gap-5">
            <div className="flex-1">
              <h2 className="font-family-souvenir xl:text-4xl 2xl:text-5xl md:text-2xl lg:text-3xl font-bold">
                Frentes Criativas
              </h2>
            </div>
            <div className="flex-1 text-right">
              <h2 className="font-family-bento-sans font-medium xl:text-4xl 2xl:text-5xl text-3xl">
                Creative Fronts
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
            <div className="flex-1">
              <p>
                Luísa Viscardi atua em frentes criativas que unem estratégia,
                arte e música. Pela JAMBOX, desenvolve projetos que fortalecem a
                cultura urbana, realizam bookings de DJs renomados e promovem
                experiências musicais inovadoras, além de idealizar a JOINT,
                festa consolidada desde 2022 como espaço de valorização do
                Hip-Hop e da boa música.
              </p>
            </div>
            <div className="flex-1 italic">
              <p>
                Luísa Viscardi works across creative fronts that combine
                strategy, art, and music. Through JAMBOX, she develops projects
                that strengthen urban culture, manage bookings for renowned DJs,
                and deliver innovative musical experiences, in addition to
                creating JOINT, a party established in 2022 as a space dedicated
                to celebrating Hip-Hop and quality music.
              </p>
            </div>
          </div>

          {/* Linha 4: Texto 2 */}
          <div className="flex gap-5 font-bento-sans font-semibold text-luisa-purple/90 tracking-wide leading-5">
            <div className="flex-1">
              <p>
                Ao lado da artista Stefanie, Luísa acompanha de perto cada passo
                da carreira, dos lançamentos aos shows, estruturando
                oportunidades e estratégias que potencializam sua trajetória
                artística e consolidam sua presença no cenário musical.
              </p>
            </div>
            <div className="flex-1 italic">
              <p>
                Alongside the artist Stefanie, Luísa closely oversees every step
                of her career, from releases to live shows, structuring
                opportunities and strategies that amplify her artistic
                trajectory and solidify her presence in the music scene.
              </p>
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
      <div
        className="grid grid-cols-12 gap-5 2xl:px-32.5 px-10 mb-28"
        id="footer"
      >
        <div className="col-span-4 col-start-3 flex justify-between items-center">
          <a
            target="blank"
            rel="noreferrer"
            href="https://www.instagram.com/luisaviscardi/"
            aria-label="Link to Luisa's instagram page"
          >
            <InstagramSvg />
          </a>

          <a
            target="blank"
            rel="noreferrer"
            href="https://www.tiktok.com/@luisa.viscardi"
            aria-label="Link to Luisa's TikTok page"
          >
            <TikTokSvg />
          </a>

          <a
            target="blank"
            rel="noreferrer"
            href="https://soundcloud.com/luisaviscardi"
            aria-label="Link to Luisa's Soundcloud page"
          >
            <SoundCloudSvg />
          </a>

          <a
            target="blank"
            rel="noreferrer"
            href="https://open.spotify.com/artist/5crcFRnnfwZTcGybeH6OH3?si=V5TaScr5R0qOUcfqWsOd5Q"
            aria-label="Link to Luisa's Spotify page"
          >
            <SpotifySvg />
          </a>

          <a
            target="blank"
            rel="noreferrer"
            href="https://www.facebook.com/djluisaviscardi/"
            aria-label="Link to Luisa's Facebook page"
          >
            <FacebookSvg />
          </a>

          <a
            target="blank"
            rel="noreferrer"
            href="https://www.youtube.com/viscardilu"
            aria-label="Link to Luisa's YouTube page"
          >
            <YouTubeSvg />
          </a>
        </div>

        <div className="col-span-4 col-start-7 grid md:grid-cols-3 grid-cols-4 gap-5">
          {/* Texto (1 coluna) */}
          <div className="col-span-1 md:col-start-1 lg:col-start-2 flex items-center">
            <p className="font-family-souvenir text-luisa-pink uppercase leading-4 text-xs xl:text-base">
              spreading the noise
            </p>
          </div>

          {/* SVGs (1 coluna) */}
          <div className="col-span-3 md:col-start-2 lg:col-start-3 flex items-center justify-between">
            <FooterSvg1 className="max-w-8 h-auto" />
            <FooterSvg2 className="max-w-8 h-auto" />
            <FooterSvg3 className="max-w-8 h-auto" />
          </div>
        </div>
      </div>
    </main>
  )
}
