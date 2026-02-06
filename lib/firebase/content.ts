import { db } from '@/lib/firebase'
import type { SiteContent } from '@/types/admin'
import { doc, getDoc, setDoc } from 'firebase/firestore'

const CONTENT_DOC_ID = 'site-texts'
const COLLECTION_NAME = 'content'

const DEFAULT_CONTENT: SiteContent = {
  about: {
    paragraph1PT:
      'A relação de Luísa Viscardi com a música e a arte vai muito além dos palcos. DJ, produtora musical e empresária, ela une música e moda como formas complementares de expressão, criando uma identidade artística única. Seu estilo freestyle permite transitar entre gêneros e décadas com liberdade, trazendo energia e personalidade a cada set.',
    paragraph1EN:
      "Luísa Viscardi's connection with music and art goes far beyond the stage. As a DJ, music producer, and entrepreneur, she combines music and fashion as complementary forms of expression, creating a unique artistic identity. Her freestyle approach allows her to move freely across genres and decades, delivering sets full of energy and personality.",
    paragraph2PT:
      'Fundadora da JAMBOX, Luísa é responsável pelo desenvolvimento de projetos focados na cultura urbana, agenciando artistas brasileiros e realizando bookings de DJs internacionais no Brasil, além de promover experiências musicais inovadoras. É também uma das idealizadoras da JOINT, festa que desde 2022 se consolidou como referência na valorização do Hip-Hop e da boa música.',
    paragraph2EN:
      'Founder of JAMBOX, Luísa develops projects focused on urban culture, managing Brazilian artists and handling bookings for international DJs in Brazil, while creating innovative musical experiences. She is also one of the creators of JOINT, a party that has been a reference in celebrating Hip-Hop and quality music since 2022.',
    paragraph3PT:
      'Ao longo de sua carreira, Luísa se apresentou em grandes festivais e eventos, incluindo The Town, MITA Festival, Rock The Mountain, Baile da Vogue, Ensaios da Anitta, Réveillon dos Milagres e Nômade Festival, além de eventos de marcas globais como Adidas x Gucci, Google, Mercedes-Benz, Sephora, Netflix e Red Bull. Internacionalmente, levou sua música para países como Nova Zelândia, Austrália, Bahamas, Espanha, Itália, Inglaterra, Estados Unidos, Portugal e Maldivas.',
    paragraph3EN:
      'Throughout her career, Luísa has performed at major festivals and events, including The Town, MITA Festival, Rock The Mountain, Baile da Vogue, Ensaios da Anitta, Réveillon dos Milagres, and Nômade Festival, as well as events for global brands such as Adidas x Gucci, Google, Mercedes-Benz, Sephora, Netflix, and Red Bull. Internationally, she has brought her music to countries including New Zealand, Australia, the Bahamas, Spain, Italy, England, the United States, Portugal, and the Maldives.',
    shortTextPT:
      'Do Hip-Hop à Música Brasileira, passando por Funk, House, Pop e Soul, Luísa mistura ritmos e eras com liberdade e inovação, criando experiências sonoras que atravessam décadas e envolvem gerações.',
    shortTextEN:
      'From Hip-Hop to Brazilian Music, spanning Funk, House, Pop, and Soul, Luísa blends rhythms and eras with freedom and innovation, creating sonic experiences that cross decades and captivate generations.',
  },
  frentesCriativas: {
    titlePT: 'Frentes Criativas',
    titleEN: 'Creative Fronts',
    paragraph1PT:
      'Luísa Viscardi atua em frentes criativas que unem estratégia, arte e música. Pela JAMBOX, desenvolve projetos que fortalecem a cultura urbana, realizam bookings de DJs renomados e promovem experiências musicais inovadoras, além de idealizar a JOINT, festa consolidada desde 2022 como espaço de valorização do Hip-Hop e da boa música.',
    paragraph1EN:
      'Luísa Viscardi works across creative fronts that combine strategy, art, and music. Through JAMBOX, she develops projects that strengthen urban culture, manage bookings for renowned DJs, and deliver innovative musical experiences, in addition to creating JOINT, a party established in 2022 as a space dedicated to celebrating Hip-Hop and quality music.',
    paragraph2PT:
      'Ao lado da artista Stefanie, Luísa acompanha de perto cada passo da carreira, dos lançamentos aos shows, estruturando oportunidades e estratégias que potencializam sua trajetória artística e consolidam sua presença no cenário musical.',
    paragraph2EN:
      'Alongside the artist Stefanie, Luísa closely oversees every step of her career, from releases to live shows, structuring opportunities and strategies that amplify her artistic trajectory and solidify her presence in the music scene.',
  },
  myTunes: {
    textPT:
      'Do Hip-Hop à Música Brasileira, sons que cruzam décadas e estilos, transformando cada set em uma jornada musical.',
    textEN:
      'From Hip-Hop to Brazilian Music, sounds that cross decades and genres, turning every set into a musical journey.',
  },
}

export const getSiteContent = async (): Promise<SiteContent> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, CONTENT_DOC_ID)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return docSnap.data() as SiteContent
    }

    return DEFAULT_CONTENT
  } catch (error) {
    console.error('Error fetching content:', error)
    return DEFAULT_CONTENT
  }
}

export const updateSiteContent = async (
  content: Partial<SiteContent>
): Promise<{ success: boolean; error: string | null }> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, CONTENT_DOC_ID)
    await setDoc(docRef, content, { merge: true })
    return { success: true, error: null }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An error occurred'
    return { success: false, error: errorMessage }
  }
}
