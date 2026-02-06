'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/context/auth-provider'
import { addEvent, deleteEvent, getAllEvents } from '@/lib/firebase/agenda'
import type { AgendaEvent } from '@/types/admin'
import { ArrowLeft, Calendar, Loader2, Plus, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

const sortEventsByDate = (eventsToSort: AgendaEvent[]) => {
  return [...eventsToSort].sort((a, b) => {
    const parseDate = (dateStr: string) => {
      const [day, month] = dateStr.split('/').map(Number)
      return new Date(new Date().getFullYear(), month - 1, day).getTime()
    }
    return parseDate(a.date) - parseDate(b.date)
  })
}

export default function AgendaPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const [events, setEvents] = useState<AgendaEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newEventDate, setNewEventDate] = useState('')
  const [newEventVenue, setNewEventVenue] = useState('')
  const [saving, setSaving] = useState(false)
  const initializedRef = useRef(false)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login')
    }
  }, [user, authLoading, router])

  useEffect(() => {
    if (user && !initializedRef.current) {
      initializedRef.current = true
      getAllEvents().then(eventsList => {
        setEvents(sortEventsByDate(eventsList))
        setLoading(false)
      })
    }
  }, [user])

  const handleAddEvent = async () => {
    if (!newEventDate || !newEventVenue) return

    setSaving(true)

    const { id, error } = await addEvent(newEventDate, newEventVenue)

    if (error) {
      alert(`Erro ao adicionar evento: ${error}`)
    } else if (id) {
      const newEvent: AgendaEvent = {
        id,
        date: newEventDate,
        venue: newEventVenue,
        createdAt: new Date(),
      }

      setEvents(prev => sortEventsByDate([...prev, newEvent]))

      setNewEventDate('')
      setNewEventVenue('')
      setIsAddDialogOpen(false)
    }

    setSaving(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja deletar este evento?')) return

    const { error } = await deleteEvent(id)

    if (error) {
      alert(`Erro ao deletar: ${error}`)
    } else {
      setEvents(prev => prev.filter(event => event.id !== id))
    }
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push('/admin')}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold uppercase text-luisa-purple">
                Agenda 2026
              </h1>
              <p className="text-xs text-muted-foreground">
                {events.length} {events.length === 1 ? 'evento' : 'eventos'}
              </p>
            </div>
          </div>
          <Button
            onClick={() => setIsAddDialogOpen(true)}
            className="gap-2 bg-luisa-pink hover:opacity-90 transition-opacity"
          >
            <Plus className="w-4 h-4" />
            Adicionar Evento
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {events.length === 0 ? (
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <Calendar className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Nenhum evento agendado
              </h3>
              <p className="text-sm text-muted-foreground mb-6 text-center max-w-md">
                Comece adicionando seu primeiro evento à agenda.
              </p>
              <Button
                onClick={() => setIsAddDialogOpen(true)}
                className="gap-2 bg-linear-to-r from-primary to-primary/80 hover:opacity-90 transition-opacity"
              >
                <Plus className="w-4 h-4" />
                Adicionar Primeiro Evento
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {events.map(event => (
              <Card
                key={event.id}
                className="border-border/50 bg-card/50 backdrop-blur hover:border-primary/50 transition-colors group"
              >
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="flex items-center justify-center w-16 h-16 rounded-lg bg-linear-to-br from-primary/20 to-primary/10 border border-primary/30">
                      <span className="font-bold text-lg text-primary">
                        {event.date}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-sm uppercase text-foreground">
                        {event.venue}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Adicionado em{' '}
                        {new Date(event.createdAt).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="opacity-75 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={() => handleDelete(event.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      {/* Add Event Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-md bg-card border-border">
          <DialogHeader>
            <DialogTitle>Adicionar Evento</DialogTitle>
            <DialogDescription>
              Adicione um novo evento à agenda de 2025
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {/* Date Input */}
            <div className="space-y-2">
              <Label htmlFor="event-date">Data</Label>
              <Input
                id="event-date"
                type="text"
                placeholder="DD/MM (ex: 15/03)"
                value={newEventDate}
                onChange={e => setNewEventDate(e.target.value)}
                className="bg-background/50"
                maxLength={5}
                disabled={saving}
              />
              <p className="text-xs text-muted-foreground">
                Formato: DD/MM (dia/mês)
              </p>
            </div>

            {/* Venue Input */}
            <div className="space-y-2">
              <Label htmlFor="event-venue">Local / Evento</Label>
              <Input
                id="event-venue"
                type="text"
                placeholder="Ex: carnaval bobz @ barra grande / PI"
                value={newEventVenue}
                onChange={e => setNewEventVenue(e.target.value)}
                className="bg-background/50"
                disabled={saving}
              />
              <p className="text-xs text-muted-foreground">
                Inclua nome do evento, local e cidade/estado
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={() => {
                  setIsAddDialogOpen(false)
                  setNewEventDate('')
                  setNewEventVenue('')
                }}
                disabled={saving}
              >
                Cancelar
              </Button>
              <Button
                onClick={handleAddEvent}
                disabled={!newEventDate || !newEventVenue || saving}
                className="gap-2 bg-linear-to-r from-primary to-primary/80 hover:opacity-90 transition-opacity"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  'Adicionar'
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
