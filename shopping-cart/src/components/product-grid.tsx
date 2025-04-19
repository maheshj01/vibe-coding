import { getProducts } from "../api"
import { Product } from "../types"
import ProductCard from "./ProductCard"

export default async function ProductGrid() {
  const products = await getProducts()

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product: Product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

