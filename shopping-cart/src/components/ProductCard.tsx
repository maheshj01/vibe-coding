import { Link } from "lucide-react"
import AddToCartButton from "./add-to-cart-button"
import { Card, CardContent, CardFooter } from "./ui/card"
import { Product } from "../types"
import { formatPrice } from "../utils"

interface ProductCardProps {
    product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
            <Link href={`/product/${product.id}`} className="relative block h-48">
                <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.title}
                    className="object-contain p-4"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
            </Link>

            <CardContent className="p-4">
                <div className="mb-2">
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{product.category}</span>
                </div>
                <Link href={`/product/${product.id}`}>
                    <h3 className="font-medium text-gray-900 dark:text-gray-100 line-clamp-1 hover:text-primary transition-colors">
                        {product.title}
                    </h3>
                </Link>
                <div className="mt-2 font-bold text-primary">{formatPrice(product.price)}</div>
            </CardContent>

            <CardFooter className="p-4 pt-0">
                <AddToCartButton product={product} />
            </CardFooter>
        </Card>
    )
}

