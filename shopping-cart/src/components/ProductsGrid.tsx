import { useSelector } from "react-redux";
import { RootState } from "../features/Store";
import ProductCard from "./ProductCard";
interface ProductsGridProps {
    className?: string;
}
const ProductsGrid: React.FC<ProductsGridProps> = ({ className }) => {
    const products = useSelector((state: RootState) => state.products.products);
    return (
        <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ${className}`}>
            {
                products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))
            }
        </div>
    )
}

export default ProductsGrid;