import { FaTrash } from "react-icons/fa6";
import Product from "../types/Product";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../features/productSlice";

const CartCard: React.FC<{ product: Product }> = ({ product }) => {
    const dispatch = useDispatch();
    const handleRemoveFromCart = () => {
        dispatch(removeFromCart(product));
    }

    return (
        <div className="flex bg-gray-300 justify-between px-4 py-2 items-center">
            <div className="flex flex-col flex-grow">
                <p className="text-lg font-bold">{product.name}</p>
                <p className="text-sm text-gray-500">{product.currency} {product.price}</p>
            </div>
            <FaTrash className="text-red-500 cursor-pointer" onClick={handleRemoveFromCart} />
        </div>
    );
}

export default CartCard;