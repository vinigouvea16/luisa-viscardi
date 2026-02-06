'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { useAuth } from '@/context/auth-provider'
import { getSiteContent, updateSiteContent } from '@/lib/firebase/content'
import type { SiteContent } from '@/types/admin'
import { ArrowLeft, Loader2, Save } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

export default function ContentPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const [content, setContent] = useState<SiteContent | null>(null)
  const [loading, setLoading] = useState(true)
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
      getSiteContent().then(data => {
        setContent(data)
        setLoading(false)
      })
    }
  }, [user])

  const handleSave = async () => {
    if (!content) return

    setSaving(true)
    const { error } = await updateSiteContent(content)

    if (error) {
      alert(`Erro ao salvar: ${error}`)
    } else {
      alert('Conteúdo salvo com sucesso!')
    }
    setSaving(false)
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!content) return null

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
                Textos do Site
              </h1>
              <p className="text-xs text-muted-foreground">
                Edite o conteúdo das seções
              </p>
            </div>
          </div>
          <Button
            onClick={handleSave}
            disabled={saving}
            className="gap-2 bg-linear-to-bl from-luisa-purple from-10% to-primary cursor-pointer font-light"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Salvando...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 " />
                Salvar Tudo
              </>
            )}
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <Tabs defaultValue="about" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="about">Sobre</TabsTrigger>
            <TabsTrigger value="frentes">Frentes Criativas</TabsTrigger>
            <TabsTrigger value="tunes">My Tunes</TabsTrigger>
          </TabsList>

          {/* TAB: SOBRE */}
          <TabsContent value="about" className="space-y-6">
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle>
                  Seção Sobre - Textos Longos (antes do GIF)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Parágrafo 1 PT */}
                <div className="space-y-2">
                  <Label htmlFor="about-p1-pt">Parágrafo 1 - PT</Label>
                  <Textarea
                    id="about-p1-pt"
                    rows={4}
                    value={content.about.paragraph1PT}
                    onChange={e =>
                      setContent({
                        ...content,
                        about: {
                          ...content.about,
                          paragraph1PT: e.target.value,
                        },
                      })
                    }
                    className="font-mono text-sm"
                  />
                </div>

                {/* Parágrafo 1 EN */}
                <div className="space-y-2">
                  <Label htmlFor="about-p1-en">Parágrafo 1 - EN</Label>
                  <Textarea
                    id="about-p1-en"
                    rows={4}
                    value={content.about.paragraph1EN}
                    onChange={e =>
                      setContent({
                        ...content,
                        about: {
                          ...content.about,
                          paragraph1EN: e.target.value,
                        },
                      })
                    }
                    className="font-mono text-sm"
                  />
                </div>

                {/* Parágrafo 2 PT */}
                <div className="space-y-2">
                  <Label htmlFor="about-p2-pt">Parágrafo 2 - PT</Label>
                  <Textarea
                    id="about-p2-pt"
                    rows={4}
                    value={content.about.paragraph2PT}
                    onChange={e =>
                      setContent({
                        ...content,
                        about: {
                          ...content.about,
                          paragraph2PT: e.target.value,
                        },
                      })
                    }
                    className="font-mono text-sm"
                  />
                </div>

                {/* Parágrafo 2 EN */}
                <div className="space-y-2">
                  <Label htmlFor="about-p2-en">Parágrafo 2 - EN</Label>
                  <Textarea
                    id="about-p2-en"
                    rows={4}
                    value={content.about.paragraph2EN}
                    onChange={e =>
                      setContent({
                        ...content,
                        about: {
                          ...content.about,
                          paragraph2EN: e.target.value,
                        },
                      })
                    }
                    className="font-mono text-sm"
                  />
                </div>

                {/* Parágrafo 3 PT */}
                <div className="space-y-2">
                  <Label htmlFor="about-p3-pt">Parágrafo 3 - PT</Label>
                  <Textarea
                    id="about-p3-pt"
                    rows={4}
                    value={content.about.paragraph3PT}
                    onChange={e =>
                      setContent({
                        ...content,
                        about: {
                          ...content.about,
                          paragraph3PT: e.target.value,
                        },
                      })
                    }
                    className="font-mono text-sm"
                  />
                </div>

                {/* Parágrafo 3 EN */}
                <div className="space-y-2">
                  <Label htmlFor="about-p3-en">Parágrafo 3 - EN</Label>
                  <Textarea
                    id="about-p3-en"
                    rows={4}
                    value={content.about.paragraph3EN}
                    onChange={e =>
                      setContent({
                        ...content,
                        about: {
                          ...content.about,
                          paragraph3EN: e.target.value,
                        },
                      })
                    }
                    className="font-mono text-sm"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle>
                  Seção Sobre - Textos Curtos (depois do GIF)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Short Text PT */}
                <div className="space-y-2">
                  <Label htmlFor="about-short-pt">Texto Curto - PT</Label>
                  <Textarea
                    id="about-short-pt"
                    rows={3}
                    value={content.about.shortTextPT}
                    onChange={e =>
                      setContent({
                        ...content,
                        about: {
                          ...content.about,
                          shortTextPT: e.target.value,
                        },
                      })
                    }
                    className="font-mono text-sm"
                  />
                </div>

                {/* Short Text EN */}
                <div className="space-y-2">
                  <Label htmlFor="about-short-en">Texto Curto - EN</Label>
                  <Textarea
                    id="about-short-en"
                    rows={3}
                    value={content.about.shortTextEN}
                    onChange={e =>
                      setContent({
                        ...content,
                        about: {
                          ...content.about,
                          shortTextEN: e.target.value,
                        },
                      })
                    }
                    className="font-mono text-sm"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB: FRENTES CRIATIVAS */}
          <TabsContent value="frentes" className="space-y-6">
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle>Frentes Criativas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Título PT */}
                <div className="space-y-2">
                  <Label htmlFor="frentes-title-pt">Título - PT</Label>
                  <Textarea
                    id="frentes-title-pt"
                    rows={1}
                    value={content.frentesCriativas.titlePT}
                    onChange={e =>
                      setContent({
                        ...content,
                        frentesCriativas: {
                          ...content.frentesCriativas,
                          titlePT: e.target.value,
                        },
                      })
                    }
                    className="font-mono text-sm"
                  />
                </div>

                {/* Título EN */}
                <div className="space-y-2">
                  <Label htmlFor="frentes-title-en">Título - EN</Label>
                  <Textarea
                    id="frentes-title-en"
                    rows={1}
                    value={content.frentesCriativas.titleEN}
                    onChange={e =>
                      setContent({
                        ...content,
                        frentesCriativas: {
                          ...content.frentesCriativas,
                          titleEN: e.target.value,
                        },
                      })
                    }
                    className="font-mono text-sm"
                  />
                </div>

                {/* Parágrafo 1 PT */}
                <div className="space-y-2">
                  <Label htmlFor="frentes-p1-pt">Parágrafo 1 - PT</Label>
                  <Textarea
                    id="frentes-p1-pt"
                    rows={4}
                    value={content.frentesCriativas.paragraph1PT}
                    onChange={e =>
                      setContent({
                        ...content,
                        frentesCriativas: {
                          ...content.frentesCriativas,
                          paragraph1PT: e.target.value,
                        },
                      })
                    }
                    className="font-mono text-sm"
                  />
                </div>

                {/* Parágrafo 1 EN */}
                <div className="space-y-2">
                  <Label htmlFor="frentes-p1-en">Parágrafo 1 - EN</Label>
                  <Textarea
                    id="frentes-p1-en"
                    rows={4}
                    value={content.frentesCriativas.paragraph1EN}
                    onChange={e =>
                      setContent({
                        ...content,
                        frentesCriativas: {
                          ...content.frentesCriativas,
                          paragraph1EN: e.target.value,
                        },
                      })
                    }
                    className="font-mono text-sm"
                  />
                </div>

                {/* Parágrafo 2 PT */}
                <div className="space-y-2">
                  <Label htmlFor="frentes-p2-pt">Parágrafo 2 - PT</Label>
                  <Textarea
                    id="frentes-p2-pt"
                    rows={4}
                    value={content.frentesCriativas.paragraph2PT}
                    onChange={e =>
                      setContent({
                        ...content,
                        frentesCriativas: {
                          ...content.frentesCriativas,
                          paragraph2PT: e.target.value,
                        },
                      })
                    }
                    className="font-mono text-sm"
                  />
                </div>

                {/* Parágrafo 2 EN */}
                <div className="space-y-2">
                  <Label htmlFor="frentes-p2-en">Parágrafo 2 - EN</Label>
                  <Textarea
                    id="frentes-p2-en"
                    rows={4}
                    value={content.frentesCriativas.paragraph2EN}
                    onChange={e =>
                      setContent({
                        ...content,
                        frentesCriativas: {
                          ...content.frentesCriativas,
                          paragraph2EN: e.target.value,
                        },
                      })
                    }
                    className="font-mono text-sm"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB: MY TUNES */}
          <TabsContent value="tunes" className="space-y-6">
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle>My Tunes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Texto PT */}
                <div className="space-y-2">
                  <Label htmlFor="tunes-pt">Texto - PT</Label>
                  <Textarea
                    id="tunes-pt"
                    rows={3}
                    value={content.myTunes.textPT}
                    onChange={e =>
                      setContent({
                        ...content,
                        myTunes: { ...content.myTunes, textPT: e.target.value },
                      })
                    }
                    className="font-mono text-sm"
                  />
                </div>

                {/* Texto EN */}
                <div className="space-y-2">
                  <Label htmlFor="tunes-en">Texto - EN</Label>
                  <Textarea
                    id="tunes-en"
                    rows={3}
                    value={content.myTunes.textEN}
                    onChange={e =>
                      setContent({
                        ...content,
                        myTunes: { ...content.myTunes, textEN: e.target.value },
                      })
                    }
                    className="font-mono text-sm"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
