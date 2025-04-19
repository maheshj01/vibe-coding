import type { Product } from "./types"

export async function getProducts(): Promise<Product[]> {
  const res = await fetch("https://fakestoreapi.com/products")

  if (!res.ok) {
    throw new Error("Failed to fetch products")
  }

  return res.json()
}

export async function getProduct(id: string): Promise<Product | null> {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`)

    if (!res.ok) {
      return null
    }

    return res.json()
  } catch (error) {
    console.error("Error fetching product:", error)
    return null
  }
}

