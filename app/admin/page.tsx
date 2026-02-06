'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useAuth } from '@/context/auth-provider'
import {
  Calendar,
  FileText,
  Images,
  Loader2,
  LogOut,
  Music,
  Settings,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function AdminDashboard() {
  const { user, loading, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur sticky top-0 z-50 ">
        <div className="container mx-auto px-4 lg:px-0 py-4 flex items-center justify-between max-w-7xl">
          <div className="flex items-center gap-3">
            <div className="bg-linear-to-br from-primary to-luisa-gradient-main-teal p-2 rounded-lg">
              <Music className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold uppercase text-luisa-purple">
                DJ Admin
              </h1>
              <p className="text-sm text-muted-foreground">Luísa Viscardi</p>
            </div>
          </div>
          <Button
            variant="ghost"
            onClick={logout}
            className="gap-2 text-base hover:text-luisa-purple hover:bg-luisa-purple/5"
          >
            <LogOut className="w-4 h-4" />
            Sair
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <h2 className="lg:text-4xl text-3xl font-bold mb-4 text-luisa-pink">
            Bem-vinda de volta!
          </h2>
          <p className="text-muted-foreground lg:text-lg">
            Gerencie o conteúdo do seu site de forma simples e rápida.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 max-w-7xl mx-auto">
          {/* Galeria Card */}
          <Card
            className="border-2 border-border/50 bg-card/50 backdrop-blur hover:border-primary hover:shadow-lg hover:shadow-primary/20 transition-all cursor-pointer group overflow-hidden relative"
            onClick={() => router.push('/admin/photos')}
          >
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-luisa-gradient-main-teal/5 opacity-0 group-hover:opacity-100 transition-opacity" />

            <CardHeader className="relative">
              <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-primary to-luisa-gradient-main-teal/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg lg:mx-0 mx-auto">
                <Images className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-center lg:text-start">
                Galeria de Mídia
              </CardTitle>
              <CardDescription className="text-base text-center lg:text-start">
                Fotos, GIFs e Vídeos
              </CardDescription>
            </CardHeader>
            <CardContent className="relative">
              <p className="text-muted-foreground mb-4 text-center lg:text-start">
                Gerencie todo o conteúdo visual do site: imagens do hero, about,
                agenda e singles musicais.
              </p>
              <div className="flex items-center gap-2 text-sm text-primary font-semibold justify-center lg:justify-start">
                <span>Acessar galeria</span>
                <span className="group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Agenda Card */}
          <Card
            className="border-2 border-border/50 bg-card/50 backdrop-blur hover:border-luisa-gradient-main-teal hover:shadow-lg hover:shadow-luisa-gradient-main-teal/20 transition-all cursor-pointer group overflow-hidden relative "
            onClick={() => router.push('/admin/agenda')}
          >
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-linear-to-tl from-luisa-gradient-main-teal/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />

            <CardHeader className="relative">
              <div className="w-16 h-16 rounded-2xl bg-linear-to-tl from-luisa-gradient-main-teal to-primary/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg lg:mx-0 mx-auto">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-center lg:text-start">
                Agenda
              </CardTitle>
              <CardDescription className="text-base text-center lg:text-start">
                Eventos e Shows
              </CardDescription>
            </CardHeader>
            <CardContent className="relative">
              <p className="text-muted-foreground mb-4 text-center lg:text-start">
                Adicione e gerencie suas próximas apresentações, eventos e datas
                importantes.
              </p>
              <div
                className="flex items-center gap-2 text-sm font-semibold  justify-center lg:justify-start"
                style={{ color: '#5ECCC3' }}
              >
                <span>Gerenciar agenda</span>
                <span className="group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Textos Card */}
          <Card
            className="border-2 border-border/50 bg-card/50 backdrop-blur hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/20 transition-all cursor-pointer group overflow-hidden relative"
            onClick={() => router.push('/admin/content')}
          >
            <div className="absolute inset-0 bg-linear-to-br from-purple-500/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />

            <CardHeader className="relative">
              <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-purple-500 to-primary/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg lg:mx-0 mx-auto">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-center lg:text-start">
                Textos do Site
              </CardTitle>
              <CardDescription className="text-base text-center lg:text-start">
                Editar Conteúdo
              </CardDescription>
            </CardHeader>
            <CardContent className="relative">
              <p className="text-muted-foreground mb-4 text-center lg:text-start">
                Edite os textos das seções Sobre, Frentes Criativas e My Tunes.
              </p>
              <div className="flex items-center gap-2 text-sm text-purple-500 font-semibold justify-center lg:justify-start">
                <span>Editar textos</span>
                <span className="group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Settings Card */}
          <Card
            className="border-2 border-border/50 bg-card/50 backdrop-blur hover:border-luisa-gray hover:shadow-lg hover:shadow-luisa-pink/20 transition-all cursor-pointer group overflow-hidden relative"
            onClick={() => router.push('/admin/settings')}
          >
            <div className="absolute inset-0 bg-linear-to-br from-luisa-gray/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />

            <CardHeader className="relative">
              <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-purple-200 to-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg lg:mx-0 mx-auto">
                <Settings className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-center lg:text-start">
                Configurações
              </CardTitle>
              <CardDescription className="text-base text-center lg:text-start">
                Press Kit e Redes Sociais
              </CardDescription>
            </CardHeader>
            <CardContent className="relative">
              <p className="text-muted-foreground mb-4 text-center lg:text-start">
                Atualize o Press Kit (PDF) e os links das suas redes sociais.
              </p>
              <div className="flex items-center gap-2 text-sm text-luisa-pink font-semibold justify-center lg:justify-start">
                <span>Configurar</span>
                <span className="group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
