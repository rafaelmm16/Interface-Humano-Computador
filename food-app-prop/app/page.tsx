"use client"

import { useState } from "react"
import { LoginScreen } from "@/components/login-screen"
import { MenuScreen } from "@/components/menu-screen"
import { CheckoutScreen } from "@/components/checkout-screen"

export type CartItem = {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

export default function FoodDeliveryApp() {
  const [currentScreen, setCurrentScreen] = useState<"login" | "menu" | "checkout">("login")
  const [cart, setCart] = useState<CartItem[]>([])

  const addToCart = (item: Omit<CartItem, "quantity">) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id)
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem,
        )
      }
      return [...prevCart, { ...item, quantity: 1 }]
    })
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity === 0) {
      setCart((prevCart) => prevCart.filter((item) => item.id !== id))
    } else {
      setCart((prevCart) => prevCart.map((item) => (item.id === id ? { ...item, quantity } : item)))
    }
  }

  const clearCart = () => {
    setCart([])
  }

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  return (
    <div className="min-h-screen bg-background">
      {currentScreen === "login" && <LoginScreen onLogin={() => setCurrentScreen("menu")} />}
      {currentScreen === "menu" && (
        <MenuScreen
          onAddToCart={addToCart}
          cartItemCount={getTotalItems()}
          onViewCart={() => setCurrentScreen("checkout")}
        />
      )}
      {currentScreen === "checkout" && (
        <CheckoutScreen
          cart={cart}
          onUpdateQuantity={updateQuantity}
          onBack={() => setCurrentScreen("menu")}
          onConfirmOrder={clearCart}
        />
      )}
    </div>
  )
}