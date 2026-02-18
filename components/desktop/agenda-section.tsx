/* eslint-disable @next/next/no-img-element */
'use client'

import { getAllEvents } from '@/lib/firebase/agenda'
import { getMediaByCategory } from '@/lib/firebase/media'
import type { AgendaEvent } from '@/types/admin'
import type { Media } from '@/types/admin'
import { useEffect, useState } from 'react'
import RecordPlayerSvg from '../svgs/purple-svgs/body/record-player'

const isPastDate = (dateStr: string) => {
  const [day, month] = dateStr.split('/').map(Number)
  const currentYear = new Date().getFullYear()
  const eventDate = new Date(currentYear, month - 1, day)
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return eventDate < today
}

const sortEventsByDate = (eventsToSort: AgendaEvent[]) => {
  return [...eventsToSort].sort((a, b) => {
    const parseDate = (dateStr: string) => {
      const [day, month] = dateStr.split('/').map(Number)
      return new Date(new Date().getFullYear(), month - 1, day).getTime()
    }
    return parseDate(a.date) - parseDate(b.date)
  })
}

export default function AgendaSection() {
  const [events, setEvents] = useState<AgendaEvent[]>([])
  const [agendaGif, setAgendaGif] = useState<Media | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadAgendaData = async () => {
      const eventsList = await getAllEvents()
      const futureEvents = eventsList.filter(event => !isPastDate(event.date))
      const sortedEvents = sortEventsByDate(futureEvents).slice(0, 10)
      setEvents(sortedEvents)

      const agendaMedia = await getMediaByCategory('agenda-gif')
      if (agendaMedia.length > 0) {
        setAgendaGif(agendaMedia[0])
      }

      setLoading(false)
    }

    loadAgendaData()
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-12 gap-5 2xl:px-32.5 px-10">
        <div className="col-start-3 col-span-8 flex items-center justify-center py-20">
          <p className="text-luisa-purple animate-pulse">
            Carregando agenda...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-12 md:gap-2 2xl:px-32.5 px-10">
      <div className="col-start-3 col-span-3">
        <p className="font-family-souvenir font-bold lg:text-6xl text-5xl text-luisa-pink">
          Agenda
        </p>
      </div>

      <div className="col-span-3 col-start-8 flex flex-col xl:gap-8 gap-4">
        <p className="flex items-center justify-end font-family-bento-sans font-medium lg:text-6xl text-5xl text-luisa-pink">
          2026
        </p>
        <div className="w-full h-px bg-luisa-pink mb-11" />
      </div>

      <div className="col-start-3 col-span-8 grid grid-cols-8 md:gap-2">
        <div className="col-span-5 flex flex-col text-luisa-purple">
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
                className="lg:grid lg:grid-cols-5 md:flex md:flex-col xl:gap-5 lg:gap-3 border-b border-luisa-purple/0 py-2.5 md:-space-y-2"
              >
                <div className="col-span-1">
                  <p className="font-family-souvenir font-semibold -tracking-widest xl:text-3xl text-2xl">
                    {event.date}
                  </p>
                </div>
                <div className="col-span-4">
                  <p className="font-family-bento-sans mt-2 font-semibold xl:font-bold tracking-wider text-sm uppercase">
                    {event.venue}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* GIF/Vídeo da agenda */}
        <div className="col-span-3">
          {agendaGif ? (
            agendaGif.type === 'video' ? (
              <video
                src={agendaGif.url}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-150 object-cover sticky top-20"
              />
            ) : (
              <img
                src={agendaGif.url}
                alt={agendaGif.title || 'agenda'}
                className="w-full h-150 object-cover sticky top-20"
              />
            )
          ) : (
            <div className="w-full h-150 bg-luisa-gray/10 flex items-center justify-center sticky top-20">
              <p className="text-luisa-purple text-xs text-center px-4">
                Faça upload do GIF/vídeo
                <br />
                Categoria: Agenda - GIF
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="col-start-3 col-span-5">
        <div className="bg-linear-to-b from-transparent via-luisa-gradient-main-pink via-85% to-transparent h-75" />
      </div>

      <div className="col-span-3 h-75">
        <div className="flex flex-col justify-between h-full pb-2 font-family-bento-sans text-[8px] lg:text-xs text-luisa-gray/80 uppercase">
          <div className="flex items-center justify-between">
            <p>{agendaGif?.title || 'ensaios da anitta'}</p>
            {/* <p>parque villa-lobos</p> */}
          </div>
          <div className="flex items-baseline justify-between">
            <p>gifs by thales côrtes</p>
            <RecordPlayerSvg />
          </div>
        </div>
      </div>
    </div>
  )
}
