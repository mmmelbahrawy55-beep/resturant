import { useState } from 'react'
import { MenuItem, CartItem } from '../types/menu'

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([])

  const addItem = (menuItem: MenuItem, quantity: number = 1, notes?: string) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === menuItem.id)
      if (existingItem) {
        return prevItems.map(item =>
          item.id === menuItem.id
            ? { ...item, quantity: item.quantity + quantity, notes }
            : item
        )
      }
      return [...prevItems, { ...menuItem, quantity, notes }]
    })
  }

  const removeItem = (id: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id))
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id)
      return
    }
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const getTotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  return {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getTotal,
  }
}
