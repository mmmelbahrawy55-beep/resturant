import { useState, useEffect } from 'react'
import { MenuItem } from '../types/menu'

export function useMenuData() {
  const [menu, setMenu] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    import('../types/menu').then(module => {
      setMenu(module.default)
      setLoading(false)
    }).catch(err => {
      setError(err instanceof Error ? err.message : 'Unknown error')
      setLoading(false)
    })
  }, [])

  return { menu, loading, error }
}
