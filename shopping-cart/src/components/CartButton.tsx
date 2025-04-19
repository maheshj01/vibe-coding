"use client"

import { ShoppingCart } from "lucide-react"
import { addToCart } from "../cartSlice"
import { useAppDispatch } from "../hooks/hooks"
import { useToast } from "../hooks/use-toast"
import { Product } from "../types"
import { Button } from "./ui/button"


interface AddToCartButtonProps {
    product: Product
    showText?: boolean
}

export default function AddToCartButton({ product, showText = true }: AddToCartButtonProps) {
    const dispatch = useAppDispatch()
    const { toast } = useToast()

    const handleAddToCart = () => {
        dispatch(
            addToCart({
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image,
                quantity: 1,
            }),
        )

        toast({
            title: "Added to cart",
            description: `${product.title} has been added to your cart.`,
            duration: 2000,
        })
    }

    return (
        <Button onClick={handleAddToCart} className="w-full">
            <ShoppingCart className="h-4 w-4 mr-2" />
            {showText ? "Add to Cart" : null}
        </Button>
    )
}

