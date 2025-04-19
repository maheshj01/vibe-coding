"use client"

import { ShoppingCart, Sun, Moon, Link } from "lucide-react"
import { useTheme } from "next-themes"
import { useAppSelector } from "../hooks/hooks"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"

export default function Header() {
    const { theme, setTheme } = useTheme()
    const { items } = useAppSelector((state) => state.cart)

    const itemCount = items.reduce((total, item) => total + item.quantity, 0)

    return (
        <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center">
                <Link href="/" className="font-bold text-xl mr-6">
                    ShopUI
                </Link>

                <div className="ml-auto flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        aria-label="Toggle theme"
                    >
                        <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    </Button>

                    <Link href="/cart">
                        <Button variant="outline" size="icon" className="relative">
                            <ShoppingCart className="h-5 w-5" />
                            {itemCount > 0 && (
                                <Badge
                                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                                    variant="destructive"
                                >
                                    {itemCount}
                                </Badge>
                            )}
                        </Button>
                    </Link>
                </div>
            </div>
        </header>
    )
}

