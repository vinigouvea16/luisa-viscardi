export type MediaCategory =
  | 'hero-main' // Imagem grande da DJ (heroimg.webp)
  | 'hero-overlay' // Gif sobreposto na hero (gif1.png)
  | 'about-gif' // Gif da seção about (gif2.png)
  | 'agenda-gif' // Gif da agenda (gif3.png)
  | 'my-tunes' // Imagem do My Tunes (single2.png)

export type MediaType = 'photo' | 'gif' | 'video'

export type Media = {
  id: string
  url: string
  title: string
  category: MediaCategory
  type: MediaType
  uploadedAt: Date
  order?: number
  link?: string
  place?: string
}

// Labels amigáveis para as categorias
export const MEDIA_CATEGORY_LABELS: Record<MediaCategory, string> = {
  'hero-main': 'Hero - Imagem Principal',
  'hero-overlay': 'Hero - GIF Sobreposto',
  'about-gif': 'About - GIF',
  'my-tunes': 'My Tunes - Imagem',
  'agenda-gif': 'Agenda - GIF',
}

// ==================== AGENDA ====================

export type AgendaEvent = {
  id: string
  date: string
  venue: string
  createdAt: Date
}

// =================== SETTINGS ====================

export type Settings = {
  pressKitUrl?: string
  instagramUrl?: string
  spotifyUrl?: string
  soundcloudUrl?: string
  tiktokUrl?: string
  youtubeUrl?: string
  facebookUrl?: string
}

// =================== CONTENT (TEXTOS DO SITE) ====================

export type AboutContent = {
  paragraph1PT: string
  paragraph1EN: string
  paragraph2PT: string
  paragraph2EN: string
  paragraph3PT: string
  paragraph3EN: string
  shortTextPT: string
  shortTextEN: string
}

export type FrentesCriativasContent = {
  titlePT: string
  titleEN: string
  paragraph1PT: string
  paragraph1EN: string
  paragraph2PT: string
  paragraph2EN: string
}

export type MyTunesContent = {
  textPT: string
  textEN: string
}

export type SiteContent = {
  about: AboutContent
  frentesCriativas: FrentesCriativasContent
  myTunes: MyTunesContent
}
