import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { CartItem } from "./types"

interface CartState {
  items: CartItem[]
  totalAmount: number
}

// Try to get initial state from localStorage if available
const getInitialState = (): CartState => {
  if (typeof window !== "undefined") {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      try {
        return JSON.parse(savedCart)
      } catch (e) {
        console.error("Failed to parse cart from localStorage", e)
      }
    }
  }

  return {
    items: [],
    totalAmount: 0,
  }
}

const initialState: CartState = {
  items: [],
  totalAmount: 0,
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find((item) => item.id === action.payload.id)

      if (existingItem) {
        existingItem.quantity += action.payload.quantity
      } else {
        state.items.push(action.payload)
      }

      state.totalAmount = calculateTotalAmount(state.items)

      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(state))
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
      state.totalAmount = calculateTotalAmount(state.items)

      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(state))
      }
    },
    increaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((item) => item.id === action.payload)
      if (item) {
        item.quantity += 1
        state.totalAmount = calculateTotalAmount(state.items)

        // Save to localStorage
        if (typeof window !== "undefined") {
          localStorage.setItem("cart", JSON.stringify(state))
        }
      }
    },
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((item) => item.id === action.payload)
      if (item && item.quantity > 1) {
        item.quantity -= 1
        state.totalAmount = calculateTotalAmount(state.items)

        // Save to localStorage
        if (typeof window !== "undefined") {
          localStorage.setItem("cart", JSON.stringify(state))
        }
      }
    },
    clearCart: (state) => {
      state.items = []
      state.totalAmount = 0

      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(state))
      }
    },
  },
})

// Helper function to calculate total amount
const calculateTotalAmount = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0)
}

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = cartSlice.actions

export default cartSlice.reducer

