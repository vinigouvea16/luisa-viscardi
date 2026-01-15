'use client'
import DesktopPage from '@/components/desktop'
import MobilePage from '@/components/mobile'
import { useIsMobile } from '@/hook/useMediaQuery'

export default function Page() {
  const isMobile = useIsMobile()
  return isMobile ? <MobilePage /> : <DesktopPage />
}
