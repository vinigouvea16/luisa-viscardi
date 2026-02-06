'use client'

import { getSiteContent } from '@/lib/firebase/content'
import type { SiteContent } from '@/types/admin'
import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'

type ContentContextType = {
  content: SiteContent | null
  loading: boolean
  refetch: () => Promise<void>
}

const ContentContext = createContext<ContentContextType | undefined>(undefined)

async function fetchContentImpl() {
  return await getSiteContent()
}

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent | null>(null)
  const [loading, setLoading] = useState(true)
  const initializedRef = useRef(false)

  const fetchContent = useCallback(async () => {
    setLoading(true)
    const data = await fetchContentImpl()
    setContent(data)
    setLoading(false)
  }, [])

  useEffect(() => {
    if (initializedRef.current) return
    initializedRef.current = true

    const run = async () => {
      await fetchContent()
    }

    run()
  }, [fetchContent])

  return (
    <ContentContext.Provider
      value={{ content, loading, refetch: fetchContent }}
    >
      {children}
    </ContentContext.Provider>
  )
}

export function useContent() {
  const context = useContext(ContentContext)
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider')
  }
  return context
}
