'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/context/auth-provider'
import {
  deletePressKit,
  getSettings,
  updateSettings,
  uploadPressKit,
} from '@/lib/firebase/settings'
import type { Settings } from '@/types/admin'
import {
  ArrowLeft,
  Download,
  Link,
  Loader2,
  Save,
  Trash2,
  Upload,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

type PressKitMode = 'link' | 'pdf'

export default function SettingsPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const [settings, setSettings] = useState<Settings>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [savingLink, setSavingLink] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [pressKitMode, setPressKitMode] = useState<PressKitMode>('link')
  const [driveLink, setDriveLink] = useState('')
  const initializedRef = useRef(false)

  // Redirecionar se não autenticado
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login')
    }
  }, [user, authLoading, router])

  // Carregar settings
  useEffect(() => {
    if (user && !initializedRef.current) {
      initializedRef.current = true
      getSettings().then(data => {
        setSettings(data)
        setLoading(false)
      })
    }
  }, [user])

  const handleSaveLinks = async () => {
    setSaving(true)
    const { error } = await updateSettings({
      instagramUrl: settings.instagramUrl,
      spotifyUrl: settings.spotifyUrl,
      soundcloudUrl: settings.soundcloudUrl,
      tiktokUrl: settings.tiktokUrl,
      youtubeUrl: settings.youtubeUrl,
      facebookUrl: settings.facebookUrl,
    })

    if (error) {
      alert(`Erro ao salvar: ${error}`)
    } else {
      alert('Links salvos com sucesso!')
    }
    setSaving(false)
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file)
    } else {
      alert('Por favor, selecione um arquivo PDF')
    }
  }

  const handleUploadPressKit = async () => {
    if (!selectedFile) return

    setUploading(true)
    const { url, error } = await uploadPressKit(selectedFile)

    if (error) {
      alert(`Erro ao fazer upload: ${error}`)
    } else if (url) {
      setSettings(prev => ({ ...prev, pressKitUrl: url }))
      setSelectedFile(null)
      alert('Press Kit atualizado com sucesso!')
    }
    setUploading(false)
  }

  const handleSaveDriveLink = async () => {
    if (!driveLink.trim()) return
    setSavingLink(true)
    const { error } = await updateSettings({ pressKitUrl: driveLink.trim() })
    if (error) {
      alert(`Erro ao salvar link: ${error}`)
    } else {
      setSettings(prev => ({ ...prev, pressKitUrl: driveLink.trim() }))
      setDriveLink('')
      alert('Link salvo com sucesso!')
    }
    setSavingLink(false)
  }

  const handleDeletePressKit = async () => {
    if (!confirm('Tem certeza que deseja deletar o Press Kit?')) return

    const isFirebaseUrl = settings.pressKitUrl?.includes(
      'firebasestorage.googleapis.com'
    )

    if (isFirebaseUrl) {
      const { error } = await deletePressKit()
      if (error) {
        alert(`Erro ao deletar: ${error}`)
        return
      }
    } else {
      const { error } = await updateSettings({ pressKitUrl: '' })
      if (error) {
        alert(`Erro ao deletar: ${error}`)
        return
      }
    }

    setSettings(prev => ({ ...prev, pressKitUrl: '' }))
    alert('Press Kit removido com sucesso!')
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
                Configurações
              </h1>
              <p className="text-xs text-muted-foreground">
                Press Kit e Redes Sociais
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-8">
          {/* Press Kit */}
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader>
              <CardTitle>Press Kit</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Current press kit */}
              {settings.pressKitUrl ? (
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Download className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium text-sm truncate max-w-xs">
                        {settings.pressKitUrl.includes(
                          'firebasestorage.googleapis.com'
                        )
                          ? 'press-kit.pdf'
                          : settings.pressKitUrl}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Press Kit atual
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        window.open(settings.pressKitUrl, '_blank')
                      }
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Abrir
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={handleDeletePressKit}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Nenhum Press Kit configurado ainda
                </p>
              )}

              {/* Mode toggle */}
              <div className="flex rounded-lg border border-border overflow-hidden w-fit">
                <button
                  type="button"
                  onClick={() => setPressKitMode('link')}
                  className={`flex items-center gap-2 px-4 py-2 text-sm transition-colors ${
                    pressKitMode === 'link'
                      ? 'bg-luisa-pink text-white'
                      : 'text-muted-foreground hover:bg-muted'
                  }`}
                >
                  <Link className="w-3.5 h-3.5" />
                  Link (Drive, etc.)
                </button>
                <button
                  type="button"
                  onClick={() => setPressKitMode('pdf')}
                  className={`flex items-center gap-2 px-4 py-2 text-sm transition-colors ${
                    pressKitMode === 'pdf'
                      ? 'bg-luisa-pink text-white'
                      : 'text-muted-foreground hover:bg-muted'
                  }`}
                >
                  <Upload className="w-3.5 h-3.5" />
                  Upload PDF
                </button>
              </div>

              {pressKitMode === 'link' ? (
                <div className="space-y-2">
                  <Label htmlFor="drive-link">URL do arquivo (Google Drive, Dropbox, etc.)</Label>
                  <div className="flex gap-2">
                    <Input
                      id="drive-link"
                      type="url"
                      placeholder="https://drive.google.com/..."
                      value={driveLink}
                      onChange={e => setDriveLink(e.target.value)}
                      disabled={savingLink}
                    />
                    <Button
                      onClick={handleSaveDriveLink}
                      disabled={!driveLink.trim() || savingLink}
                      className="gap-2 font-light"
                    >
                      {savingLink ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Salvando...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4" />
                          Salvar
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="press-kit">
                    {settings.pressKitUrl ? 'Substituir PDF' : 'Fazer Upload'}
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="press-kit"
                      type="file"
                      accept="application/pdf"
                      onChange={handleFileSelect}
                      disabled={uploading}
                    />
                    <Button
                      onClick={handleUploadPressKit}
                      disabled={!selectedFile || uploading}
                      className="gap-2 font-light"
                    >
                      {uploading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Enviando...
                        </>
                      ) : (
                        <>
                          <Upload className="w-4 h-4" />
                          Upload
                        </>
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Formato aceito: PDF (max 10MB)
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Redes Sociais */}
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader>
              <CardTitle>Links das Redes Sociais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="instagram">Instagram</Label>
                <Input
                  id="instagram"
                  type="url"
                  placeholder="https://instagram.com/..."
                  value={settings.instagramUrl || ''}
                  onChange={e =>
                    setSettings(prev => ({
                      ...prev,
                      instagramUrl: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tiktok">TikTok</Label>
                <Input
                  id="tiktok"
                  type="url"
                  placeholder="https://tiktok.com/@..."
                  value={settings.tiktokUrl || ''}
                  onChange={e =>
                    setSettings(prev => ({
                      ...prev,
                      tiktokUrl: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="soundcloud">SoundCloud</Label>
                <Input
                  id="soundcloud"
                  type="url"
                  placeholder="https://soundcloud.com/..."
                  value={settings.soundcloudUrl || ''}
                  onChange={e =>
                    setSettings(prev => ({
                      ...prev,
                      soundcloudUrl: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="spotify">Spotify</Label>
                <Input
                  id="spotify"
                  type="url"
                  placeholder="https://open.spotify.com/..."
                  value={settings.spotifyUrl || ''}
                  onChange={e =>
                    setSettings(prev => ({
                      ...prev,
                      spotifyUrl: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="facebook">Facebook</Label>
                <Input
                  id="facebook"
                  type="url"
                  placeholder="https://facebook.com/..."
                  value={settings.facebookUrl || ''}
                  onChange={e =>
                    setSettings(prev => ({
                      ...prev,
                      facebookUrl: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="youtube">YouTube</Label>
                <Input
                  id="youtube"
                  type="url"
                  placeholder="https://youtube.com/@..."
                  value={settings.youtubeUrl || ''}
                  onChange={e =>
                    setSettings(prev => ({
                      ...prev,
                      youtubeUrl: e.target.value,
                    }))
                  }
                />
              </div>

              <Button
                onClick={handleSaveLinks}
                disabled={saving}
                className="w-full font-light gap-2 bg-luisa-pink text-white"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Salvar Links
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
