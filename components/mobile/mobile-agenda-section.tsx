'use client'

import { getAllEvents } from '@/lib/firebase/agenda'
import { getMediaByCategory } from '@/lib/firebase/media'
import type { AgendaEvent, Media } from '@/types/admin'
import { useEffect, useState } from 'react'
import RecordPlayerSvg from '../svgs/purple-svgs/body/record-player'

// verifica se a data já passou (formato DD/MM)
const isPastDate = (dateStr: string) => {
  const [day, month] = dateStr.split('/').map(Number)
  const year = new Date().getFullYear()
  const eventDate = new Date(year, month - 1, day)

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return eventDate < today
}

const sortEventsByDate = (events: AgendaEvent[]) => {
  return [...events].sort((a, b) => {
    const parse = (date: string) => {
      const [day, month] = date.split('/').map(Number)
      return new Date(new Date().getFullYear(), month - 1, day).getTime()
    }

    return parse(a.date) - parse(b.date)
  })
}

export default function AgendaSectionMobile() {
  const [events, setEvents] = useState<AgendaEvent[]>([])
  const [agendaGif, setAgendaGif] = useState<Media | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      const eventsList = await getAllEvents()
      const futureEvents = eventsList.filter(event => !isPastDate(event.date))

      setEvents(sortEventsByDate(futureEvents).slice(0, 10))

      const media = await getMediaByCategory('agenda-gif')
      if (media.length > 0) {
        setAgendaGif(media[0])
      }

      setLoading(false)
    }

    loadData()
  }, [])

  if (loading) {
    return (
      <div className="flex flex-col mt-8 px-14.25">
        <div className="flex items-center justify-center py-20">
          <p className="text-luisa-purple animate-pulse">
            Carregando agenda...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col mt-8">
      {/* header */}
      <div className="flex flex-col px-14.25 space-y-3 text-luisa-pink my-11">
        <h1 className="font-family-souvenir font-bold text-3xl">Agenda</h1>
        <div className="h-px bg-luisa-pink w-full" />
        <p className="flex justify-end font-family-bento-sans font-medium text-3xl">
          {new Date().getFullYear()}
        </p>
      </div>

      {/* lista */}
      <div className="px-14.25 mb-8">
        {events.length === 0 ? (
          // Mensagem quando não tem eventos
          <div className="py-10">
            <p className="font-family-bento-sans text-sm text-luisa-purple/70 italic">
              Novas datas em breve.
              <br />
              Fique ligado nas redes sociais para os próximos anúncios!
            </p>
          </div>
        ) : (
          // Lista de eventos
          events.map(event => (
            <div
              key={event.id}
              className="flex flex-col text-luisa-purple font-medium mb-5"
            >
              <span className="font-family-souvenir tracking-tighter text-2xl font-semibold">
                {event.date}
              </span>
              <p className="font-family-bento-sans uppercase text-sm mb-2 tracking-tight">
                {event.venue}
              </p>
              <div className="h-px bg-luisa-purple/15" />
            </div>
          ))
        )}
      </div>

      {/* footer */}
      <div className="flex flex-col px-14.25">
        <div className="bg-linear-to-b from-transparent to-luisa-gradient-main-pink h-30 flex items-end pb-1 justify-between">
          <span className="text-white uppercase font-light text-xs ml-1">
            gifs by thales côrtes
          </span>
          <RecordPlayerSvg />
        </div>

        <div className="flex flex-col">
          {agendaGif ? (
            <>
              {agendaGif.type === 'video' ? (
                <video
                  src={agendaGif.url}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-104 object-cover"
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={agendaGif.url}
                  alt={agendaGif.title || 'agenda'}
                  className="w-full h-104 object-cover"
                />
              )}

              <div className="flex justify-between text-xs font-family-bento-sans mt-2">
                <p className="uppercase text-luisa-gray/70">
                  {agendaGif.title}
                </p>
                {/* <p className="uppercase text-luisa-gray/70">
                  parque villa-lobos
                </p> */}
              </div>
            </>
          ) : (
            <div className="w-full h-104 bg-luisa-gray/10 flex items-center justify-center">
              <p className="text-luisa-purple text-xs text-center">
                Faça upload do GIF/vídeo no admin
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
