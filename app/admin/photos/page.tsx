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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAuth } from '@/context/auth-provider'
import {
  addMedia,
  deleteMedia,
  getAllMedia,
  uploadMediaFile,
} from '@/lib/firebase/media'
import type { Media, MediaCategory, MediaType } from '@/types/admin'
import { MEDIA_CATEGORY_LABELS } from '@/types/admin'
import { ArrowLeft, ImageIcon, Loader2, Upload, X } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

export default function MediaPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const [media, setMedia] = useState<Media[]>([])
  const [loading, setLoading] = useState(true)
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)
  const [newMediaTitle, setNewMediaTitle] = useState('')
  const [newMediaLink, setNewMediaLink] = useState('')
  const [newMediaCategory, setNewMediaCategory] =
    useState<MediaCategory>('hero-main')
  const [newMediaType, setNewMediaType] = useState<MediaType>('photo')
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [activeTab, setActiveTab] = useState<MediaCategory>('hero-main')
  const [uploading, setUploading] = useState(false)
  const initializedRef = useRef(false)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login')
    }
  }, [user, authLoading, router])

  useEffect(() => {
    if (user && !initializedRef.current) {
      initializedRef.current = true
      getAllMedia().then(mediaList => {
        setMedia(mediaList)
        setLoading(false)
      })
    }
  }, [user])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)

      const objectUrl = URL.createObjectURL(file)
      setPreviewUrl(objectUrl)

      const extension = file.name.split('.').pop()?.toLowerCase()

      if (extension === 'gif') {
        setNewMediaType('gif')
      } else if (
        extension === 'mp4' ||
        extension === 'webm' ||
        extension === 'mov'
      ) {
        setNewMediaType('video')
      } else {
        setNewMediaType('photo')
      }
    }
  }

  const handleUpload = async () => {
    if (!selectedFile || !newMediaTitle || !newMediaCategory) return

    setUploading(true)

    try {
      const fileUrl = await uploadMediaFile(selectedFile, newMediaCategory)

      const { id, error } = await addMedia(
        newMediaTitle,
        fileUrl,
        newMediaCategory,
        newMediaType,
        newMediaLink || undefined
      )

      if (error) {
        alert(`Erro ao adicionar media: ${error}`)
      } else if (id) {
        const newMedia: Media = {
          id,
          url: fileUrl,
          title: newMediaTitle,
          category: newMediaCategory,
          type: newMediaType,
          uploadedAt: new Date(),
          link: newMediaLink || undefined,
        }

        setMedia(prev => [newMedia, ...prev])

        // Reset form e limpar preview
        if (previewUrl) {
          URL.revokeObjectURL(previewUrl)
        }
        setNewMediaTitle('')
        setNewMediaLink('')
        setNewMediaCategory('hero-main')
        setNewMediaType('photo')
        setPreviewUrl(null)
        setSelectedFile(null)
        setIsUploadDialogOpen(false)
      }
    } catch (error) {
      console.error('Error uploading:', error)
      alert('Erro ao fazer upload')
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (id: string, url: string) => {
    if (!confirm('Tem certeza que deseja deletar esta mídia?')) return

    const { error } = await deleteMedia(id, url)

    if (error) {
      alert(`Erro ao deletar: ${error}`)
    } else {
      // Remover media localmente
      setMedia(prev => prev.filter(item => item.id !== id))
    }
  }

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl])

  const getMediaByCategory = (category: MediaCategory) => {
    return media.filter(item => item.category === category)
  }

  const getCategoryCount = (category: MediaCategory) => {
    return getMediaByCategory(category).length
  }

  const categories = Object.keys(MEDIA_CATEGORY_LABELS) as MediaCategory[]

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
              <h1 className="text-xl font-bold text-luisa-purple uppercase">
                Galeria de Mídia
              </h1>
              <p className="text-xs text-muted-foreground">
                {media.length} {media.length === 1 ? 'item' : 'itens'}
              </p>
            </div>
          </div>
          <Button
            onClick={() => setIsUploadDialogOpen(true)}
            className="gap-2 bg-linear-to-r from-primary to-luisa-gradient-main-teal hover:opacity-90 transition-opacity"
          >
            <Upload className="w-4 h-4" />
            <span className="hidden sm:inline">Upload</span>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Mobile: Dropdown de categorias */}
        <div className="md:hidden mb-6">
          <Select
            value={activeTab}
            onValueChange={v => setActiveTab(v as MediaCategory)}
          >
            <SelectTrigger className="w-full">
              <SelectValue>
                {MEDIA_CATEGORY_LABELS[activeTab]} (
                {getCategoryCount(activeTab)})
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {MEDIA_CATEGORY_LABELS[category]} (
                  {getCategoryCount(category)})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Desktop: Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={v => setActiveTab(v as MediaCategory)}
          className="hidden md:block"
        >
          <TabsList className="mb-6 flex-wrap h-auto">
            {categories.map(category => (
              <TabsTrigger key={category} value={category} className="gap-2">
                {MEDIA_CATEGORY_LABELS[category]}
                <span className="text-xs bg-muted px-1.5 py-0.5 rounded">
                  {getCategoryCount(category)}
                </span>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Conteúdo da categoria ativa */}
        {getMediaByCategory(activeTab).length === 0 ? (
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardContent className="flex flex-col items-center justify-center py-16 px-4">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <ImageIcon className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-center">
                Nenhum item em `{MEDIA_CATEGORY_LABELS[activeTab]}`
              </h3>
              <p className="text-sm text-muted-foreground mb-6 text-center max-w-md">
                Faça upload de uma foto, GIF ou vídeo para esta seção.
              </p>
              <Button
                onClick={() => {
                  setNewMediaCategory(activeTab)
                  setIsUploadDialogOpen(true)
                }}
                className="gap-2 bg-linear-to-r from-primary to-luisa-gradient-main-teal hover:opacity-90 transition-opacity"
              >
                <Upload className="w-4 h-4" />
                Upload para esta seção
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {getMediaByCategory(activeTab).map(item => (
              <Card
                key={item.id}
                className="border-border/50 bg-card/50 backdrop-blur overflow-hidden group"
              >
                <div className="relative aspect-square">
                  {/* Renderizar baseado no tipo */}
                  {item.type === 'video' ? (
                    <video
                      src={item.url}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  ) : item.type === 'gif' ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.url}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Image
                      fill
                      src={item.url}
                      alt={item.title}
                      className="object-cover"
                    />
                  )}

                  <div className="absolute top-2 left-2 px-2 py-1 bg-black/70 text-white text-xs rounded">
                    {item.type === 'gif'
                      ? 'GIF'
                      : item.type === 'video'
                        ? 'Vídeo'
                        : 'Foto'}
                  </div>

                  {/* Badge de link se tiver */}
                  {item.link && (
                    <div className="absolute top-2 left-2 right-auto ml-20 px-2 py-1 bg-blue-600/70 text-white text-xs rounded">
                      🔗 Link
                    </div>
                  )}

                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 sm:opacity-100 transition-opacity"
                    onClick={() => handleDelete(item.id, item.url)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-sm truncate">
                    {item.title}
                  </h3>
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-500 hover:underline truncate block mt-1"
                    >
                      {item.link}
                    </a>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(item.uploadedAt).toLocaleDateString('pt-BR')}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      {/* Upload Dialog */}
      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent className="sm:max-w-md bg-card border-border max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Upload Mídia</DialogTitle>
            <DialogDescription>
              Adicione uma foto, GIF ou vídeo à galeria
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {/* Category Selection */}
            <div className="space-y-2">
              <Label htmlFor="category">Seção</Label>
              <Select
                value={newMediaCategory}
                onValueChange={value =>
                  setNewMediaCategory(value as MediaCategory)
                }
                disabled={uploading}
              >
                <SelectTrigger id="category" className="bg-background/50">
                  <SelectValue placeholder="Selecione a seção" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {MEDIA_CATEGORY_LABELS[category]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* File Selection */}
            <div className="space-y-2">
              <Label htmlFor="media-file">Selecionar Arquivo</Label>
              <Input
                id="media-file"
                type="file"
                accept="image/*,video/mp4,video/webm,video/quicktime"
                onChange={handleFileSelect}
                className="bg-background/50"
                disabled={uploading}
              />
              <p className="text-xs text-muted-foreground">
                Aceita JPG, PNG, GIF, WEBP, MP4, WEBM, MOV
              </p>
            </div>

            {/* Preview */}
            {previewUrl && (
              <div className="relative aspect-video rounded-lg overflow-hidden border border-border">
                {newMediaType === 'video' ? (
                  <video
                    src={previewUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute top-2 left-2 px-2 py-1 bg-black/70 text-white text-xs rounded">
                  {newMediaType === 'gif'
                    ? 'GIF'
                    : newMediaType === 'video'
                      ? 'Vídeo'
                      : 'Foto'}
                </div>
              </div>
            )}

            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="media-title">Título</Label>
              <Input
                id="media-title"
                type="text"
                placeholder="Ex: Ensaios da Anitta"
                value={newMediaTitle}
                onChange={e => setNewMediaTitle(e.target.value)}
                className="bg-background/50"
                disabled={uploading}
              />
            </div>

            {/* Link (opcional) */}
            <div className="space-y-2">
              <Label htmlFor="media-link">
                Link (opcional)
                <span className="text-xs text-muted-foreground ml-2">
                  Ex: Soundcloud, Spotify, YouTube
                </span>
              </Label>
              <Input
                id="media-link"
                type="url"
                placeholder="https://soundcloud.com/..."
                value={newMediaLink}
                onChange={e => setNewMediaLink(e.target.value)}
                className="bg-background/50"
                disabled={uploading}
              />
              <p className="text-xs text-muted-foreground">
                Usado no botão PLAY da seção My Tunes
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={() => {
                  setIsUploadDialogOpen(false)
                  if (previewUrl) {
                    URL.revokeObjectURL(previewUrl)
                  }
                  setPreviewUrl(null)
                  setSelectedFile(null)
                  setNewMediaTitle('')
                  setNewMediaLink('')
                }}
                disabled={uploading}
              >
                Cancelar
              </Button>
              <Button
                onClick={handleUpload}
                disabled={!previewUrl || !newMediaTitle || uploading}
                className="gap-2 bg-linear-to-r from-primary to-luisa-gradient-main-teal hover:opacity-90 transition-opacity"
              >
                {uploading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  'Upload'
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
