"use client"

import { useState } from "react"
import Image from "next/image" // <-- ADICIONADO
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, CreditCard, Wallet, Minus, Plus, Trash2, CheckCircle2 } from "lucide-react"
import type { CartItem } from "@/app/page"

interface CheckoutScreenProps {
  cart: CartItem[]
  onUpdateQuantity: (id: string, quantity: number) => void
  onBack: () => void
}

export function CheckoutScreen({ cart, onUpdateQuantity, onBack }: CheckoutScreenProps) {
  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [orderConfirmed, setOrderConfirmed] = useState(false)

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  const deliveryFee = 8.0
  const total = subtotal + deliveryFee

  const handleConfirmOrder = () => {
    setOrderConfirmed(true)
  }

  if (orderConfirmed) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-secondary/20">
        <Card className="w-full max-w-md text-center shadow-xl">
          <CardHeader className="space-y-4">
            <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-12 h-12 text-primary" aria-hidden="true" />
            </div>
            <CardTitle className="text-3xl font-bold text-balance">Pedido Confirmado!</CardTitle>
            <CardDescription className="text-base text-pretty">
              Seu pedido foi recebido e está sendo preparado. Tempo estimado de entrega: 30-40 minutos.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-muted rounded-lg p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Número do pedido</span>
                <span className="font-mono font-semibold">#12345</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total pago</span>
                <span className="font-semibold text-primary">R$ {total.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={onBack} className="w-full h-12" size="lg">
              Fazer novo pedido
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" onClick={onBack} className="h-10" aria-label="Voltar ao cardápio">
            <ArrowLeft className="w-5 h-5 mr-2" aria-hidden="true" />
            Voltar ao cardápio
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8 text-balance">Finalizar Pedido</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Itens do Pedido</CardTitle>
                <CardDescription>
                  {cart.length} {cart.length === 1 ? "item" : "itens"} no carrinho
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {cart.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">Seu carrinho está vazio</p>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="flex gap-4 pb-4 border-b last:border-0">
                      <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted shrink-0 relative"> {/* <-- ADICIONADO relative */}
                        {/* SUBSTITUÍDO img por Image */}
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-balance">{item.name}</h3>
                        <p className="text-sm text-primary font-semibold mt-1">R$ {item.price.toFixed(2)}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 bg-transparent"
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            aria-label={`Diminuir quantidade de ${item.name}`}
                          >
                            <Minus className="w-4 h-4" aria-hidden="true" />
                          </Button>
                          <span className="w-8 text-center font-semibold" aria-live="polite">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 bg-transparent"
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            aria-label={`Aumentar quantidade de ${item.name}`}
                          >
                            <Plus className="w-4 h-4" aria-hidden="true" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 ml-auto text-destructive hover:text-destructive"
                            onClick={() => onUpdateQuantity(item.id, 0)}
                            aria-label={`Remover ${item.name} do carrinho`}
                          >
                            <Trash2 className="w-4 h-4" aria-hidden="true" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Forma de Pagamento</CardTitle>
                <CardDescription>Selecione como deseja pagar</CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value="credit-card" id="credit-card" />
                    <Label htmlFor="credit-card" className="flex items-center gap-3 flex-1 cursor-pointer">
                      <CreditCard className="w-5 h-5 text-muted-foreground" aria-hidden="true" />
                      <div>
                        <div className="font-semibold">Cartão de Crédito</div>
                        <div className="text-sm text-muted-foreground">Visa, Mastercard, Elo</div>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value="pix" id="pix" />
                    <Label htmlFor="pix" className="flex items-center gap-3 flex-1 cursor-pointer">
                      <Wallet className="w-5 h-5 text-muted-foreground" aria-hidden="true" />
                      <div>
                        <div className="font-semibold">PIX</div>
                        <div className="text-sm text-muted-foreground">Pagamento instantâneo</div>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-xl">Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">R$ {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Taxa de entrega</span>
                    <span className="font-medium">R$ {deliveryFee.toFixed(2)}</span>
                  </div>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">R$ {total.toFixed(2)}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={handleConfirmOrder}
                  disabled={cart.length === 0}
                  className="w-full h-12 text-base font-semibold"
                  size="lg"
                >
                  Confirmar Pedido
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}