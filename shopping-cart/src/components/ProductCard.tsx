import { useDispatch, useSelector } from "react-redux";
import Product from "../types/Product";
import { addToCart } from "../features/productSlice";
import { FaCartPlus } from "react-icons/fa6";
import { RootState } from "../features/Store";

const ProductCard = ({ product }: { product: Product }) => {
    const dispatch = useDispatch();
    const cart = useSelector((state: RootState) => state.products.cart);
    const handleAddToCart = () => {
        if (cart.some((item) => item.id === product.id)) return;
        dispatch(addToCart(product));
    }

    return (
        <div className="bg-white rounded-lg shadow-md p-4">
            <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-md" />
            <div className="flex  justify-between">
                <div className="flex flex-col justify-between">
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <p className="text-gray-500">{product.currency} {product.price}</p>
                </div>
                <FaCartPlus className="text-4xl p-2 text-blue-500 cursor-pointer" onClick={handleAddToCart} />
            </div>
        </div>
    )
}

export default ProductCard;