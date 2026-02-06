"use client"

import { createContext, useContext, useReducer, ReactNode } from "react"
import { MenuItem } from "@/services/menu.service"

interface CartItem extends MenuItem {
  quantity: number
}

interface CartState {
  items: CartItem[]
}

type CartAction =
  | { type: "ADD_ITEM"; payload: MenuItem }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "DECREMENT_ITEM"; payload: string }
  | { type: "CLEAR_CART" }


const CartContext = createContext<any>(null)

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find(
        (item) => item.id === action.payload.id
      )

      if (existing) {
        return {
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        }
      }

      return {
        items: [...state.items, { ...action.payload, quantity: 1 }],
      }
    }

    case "REMOVE_ITEM":
      return {
        items: state.items.filter((item) => item.id !== action.payload),
      }

    case "DECREMENT_ITEM": {
      const item = state.items.find((i) => i.id === action.payload)
      if (!item) return state
      if (item.quantity <= 1) {
        return {
          items: state.items.filter((i) => i.id !== action.payload),
        }
      }
      return {
        items: state.items.map((i) =>
          i.id === action.payload
            ? { ...i, quantity: i.quantity - 1 }
            : i
        ),
      }
    }

    case "CLEAR_CART":
      return { items: [] }

    default:
      return state
  }
}

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] })

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
