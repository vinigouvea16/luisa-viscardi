import { useSyncExternalStore } from 'react'

export function useMediaQuery(query: string) {
  const subscribe = (callback: () => void) => {
    const media = window.matchMedia(query)

    if (media.addEventListener) {
      media.addEventListener('change', callback)
      return () => media.removeEventListener('change', callback)
    }

    media.addListener(callback)
    return () => media.removeListener(callback)
  }

  const getSnapshot = () => {
    return window.matchMedia(query).matches
  }

  const getServerSnapshot = () => {
    return false
  }

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

export function useIsMobile() {
  return useMediaQuery('(max-width: 768px)')
}

export function useIsDesktop() {
  return useMediaQuery('(min-width: 769px)')
}
