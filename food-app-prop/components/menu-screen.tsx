"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Plus, Search, UtensilsCrossed } from "lucide-react"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import type { CartItem } from "@/app/page"

interface MenuScreenProps {
  onAddToCart: (item: Omit<CartItem, "quantity">) => void
  cartItemCount: number
  onViewCart: () => void
}

const categories = ["Todos", "Massas", "Pizzas", "Bebidas", "Sobremesas"]

const menuItems = [
  {
    id: "1",
    name: "Espaguete à Carbonara",
    description: "Massa fresca com molho cremoso, bacon e parmesão",
    price: 32.9,
    category: "Massas",
    image: "/spaghetti-carbonara.jpg",
  },
  {
    id: "2",
    name: "Pizza Margherita",
    description: "Molho de tomate, mussarela, manjericão fresco",
    price: 45.0,
    category: "Pizzas",
    image: "/margherita-pizza-basil.png",
  },
  {
    id: "3",
    name: "Lasanha Bolonhesa",
    description: "Camadas de massa, molho bolonhesa e queijo gratinado",
    price: 38.5,
    category: "Massas",
    image: "/lasagna-bolognese.png",
  },
  {
    id: "4",
    name: "Refrigerante Lata",
    description: "Coca-Cola, Guaraná ou Sprite - 350ml",
    price: 6.0,
    category: "Bebidas",
    image: "/soda-can-drink.jpg",
  },
  {
    id: "5",
    name: "Tiramisu",
    description: "Sobremesa italiana com café, mascarpone e cacau",
    price: 18.0,
    category: "Sobremesas",
    image: "/classic-tiramisu.png",
  },
  {
    id: "6",
    name: "Pizza Calabresa",
    description: "Calabresa, cebola, azeitonas e mussarela",
    price: 42.0,
    category: "Pizzas",
    image: "/pepperoni-pizza.png",
  },
  {
    id: "7",
    name: "Penne ao Pesto",
    description: "Massa penne com molho pesto de manjericão e pinhões",
    price: 29.9,
    category: "Massas",
    image: "/penne-pesto.jpg",
  },
  {
    id: "8",
    name: "Pizza Quatro Queijos",
    description: "Mussarela, gorgonzola, parmesão e provolone",
    price: 48.0,
    category: "Pizzas",
    image: "/four-cheese-pizza.jpg",
  },
  {
    id: "9",
    name: "Ravioli de Ricota",
    description: "Ravioli recheado com ricota e espinafre ao molho de manteiga",
    price: 35.0,
    category: "Massas",
    image: "/ricotta-ravioli.jpg",
  },
  {
    id: "10",
    name: "Pizza Portuguesa",
    description: "Presunto, ovos, cebola, azeitonas e mussarela",
    price: 46.0,
    category: "Pizzas",
    image: "/portuguese-pizza.jpg",
  },
  {
    id: "11",
    name: "Suco Natural",
    description: "Laranja, limão ou morango - 500ml",
    price: 8.5,
    category: "Bebidas",
    image: "/fresh-juice.jpg",
  },
  {
    id: "12",
    name: "Água Mineral",
    description: "Água mineral sem gás - 500ml",
    price: 4.0,
    category: "Bebidas",
    image: "/mineral-water.jpg",
  },
  {
    id: "13",
    name: "Pudim de Leite",
    description: "Pudim caseiro com calda de caramelo",
    price: 15.0,
    category: "Sobremesas",
    image: "/milk-pudding.jpg",
  },
  {
    id: "14",
    name: "Brownie com Sorvete",
    description: "Brownie de chocolate quente com sorvete de baunilha",
    price: 22.0,
    category: "Sobremesas",
    image: "/brownie-icecream.jpg",
  },
  {
    id: "15",
    name: "Fettuccine Alfredo",
    description: "Massa fettuccine com molho branco cremoso e parmesão",
    price: 34.5,
    category: "Massas",
    image: "/fettuccine-alfredo.jpg",
  },
  {
    id: "16",
    name: "Pizza Frango com Catupiry",
    description: "Frango desfiado, catupiry, milho e mussarela",
    price: 44.0,
    category: "Pizzas",
    image: "/chicken-pizza.jpg",
  },
  {
    id: "17",
    name: "Cerveja Artesanal",
    description: "Cerveja artesanal IPA ou Pilsen - 355ml",
    price: 12.0,
    category: "Bebidas",
    image: "/craft-beer.jpg",
  },
  {
    id: "18",
    name: "Cheesecake de Frutas Vermelhas",
    description: "Cheesecake cremoso com calda de frutas vermelhas",
    price: 20.0,
    category: "Sobremesas",
    image: "/berry-cheesecake.jpg",
  },
]

export function MenuScreen({ onAddToCart, cartItemCount, onViewCart }: MenuScreenProps) {
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [searchQuery, setSearchQuery] = useState("")
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set())

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory = selectedCategory === "Todos" || item.category === selectedCategory
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleAddToCart = (item: (typeof menuItems)[0]) => {
    onAddToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
    })
    setAddedItems((prev) => new Set(prev).add(item.id))
    setTimeout(() => {
      setAddedItems((prev) => {
        const newSet = new Set(prev)
        newSet.delete(item.id)
        return newSet
      })
    }, 1000)
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <UtensilsCrossed className="w-5 h-5 text-primary-foreground" aria-hidden="true" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-balance">FoodExpress</h1>
                <p className="text-xs text-muted-foreground">Entrega rápida e saborosa</p>
              </div>
            </div>
            <Button
              onClick={onViewCart}
              variant="outline"
              size="lg"
              className="relative h-12 px-6 bg-transparent"
              aria-label={`Ver carrinho com ${cartItemCount} itens`}
            >
              <ShoppingCart className="w-5 h-5 mr-2" aria-hidden="true" />
              <span className="font-semibold">Carrinho</span>
              {cartItemCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-6 w-6 flex items-center justify-center p-0 bg-accent text-accent-foreground">
                  {cartItemCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              type="search"
              placeholder="Buscar pratos..."
              className="pl-10 h-12"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Buscar pratos no cardápio"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wide">Categorias</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="h-10 px-6"
                aria-pressed={selectedCategory === category}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Menu Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video overflow-hidden bg-muted relative">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-xl text-balance">{item.name}</CardTitle>
                  <Badge variant="secondary" className="shrink-0">
                    {item.category}
                  </Badge>
                </div>
                <CardDescription className="text-pretty leading-relaxed">{item.description}</CardDescription>
              </CardHeader>
              <CardFooter className="flex items-center justify-between gap-4">
                <div className="text-2xl font-bold text-primary">R$ {item.price.toFixed(2)}</div>
                <Button
                  onClick={() => handleAddToCart(item)}
                  size="lg"
                  className="h-11 px-6"
                  disabled={addedItems.has(item.id)}
                  aria-label={`Adicionar ${item.name} ao carrinho`}
                >
                  {addedItems.has(item.id) ? (
                    <>
                      <span className="mr-2">✓</span>
                      Adicionado
                    </>
                  ) : (
                    <>
                      <Plus className="w-5 h-5 mr-2" aria-hidden="true" />
                      Adicionar
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">Nenhum prato encontrado. Tente outra busca ou categoria.</p>
          </div>
        )}
      </main>
    </div>
  )
}
