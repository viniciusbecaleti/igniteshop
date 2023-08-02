import { ReactNode, createContext, useState } from "react";

interface Item {
  id: string
  name: string
  imageUrl: string
  price: number,
  defaultPriceId: string
}

interface CartProviderProps {
  children: ReactNode
}

interface CartContextProps {
  cartItems: Item[],
  addItemToCart: (item: Item) => void
  removeItemFromCart: (id: string) => void
}

export const CartContext = createContext({} as CartContextProps)

export function CartProvider({ children }: CartProviderProps) {
  const [cartItems, setCartItems] = useState<Item[]>([])

  function addItemToCart(item: Item) {
    setCartItems(prev => {
      const itemAlreadyInCart = prev.find(cartItem => cartItem.id === item.id)

      if (!itemAlreadyInCart) {
        return [item, ...prev]
      }

      return prev
    })
  }

  function removeItemFromCart(id: string) {
    setCartItems(prev => prev.filter(cartItem => cartItem.id !== id))
  }

  return (
    <CartContext.Provider value={{ cartItems, addItemToCart, removeItemFromCart }}>
      {children}
    </CartContext.Provider>
  )
}
