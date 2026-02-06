'use client'

import { onAuthStateChange, signOut } from '@/lib/firebase/auth'
import type { User } from 'firebase/auth'
import { usePathname, useRouter } from 'next/navigation'
import type React from 'react'
import { createContext, useContext, useEffect, useState } from 'react'

type AuthContextType = {
  user: User | null
  loading: boolean
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  logout: async () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const unsubscribe = onAuthStateChange(user => {
      setUser(user)
      setLoading(false)

      if (!user && pathname?.startsWith('/admin')) {
        router.push('/login')
      }
    })

    return () => unsubscribe()
  }, [pathname, router])

  const logout = async () => {
    const { error } = await signOut()
    if (!error) {
      setUser(null)
      router.push('/login')
    } else {
      console.error('Erro ao fazer logout:', error)
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
