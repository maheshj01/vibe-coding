import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../features/Store";
import CartCard from "./CartCard";

const CartList = () => {
    const cart = useSelector((state: RootState) => state.products.cart);

    return (
        <div className="flex flex-col gap-4 overflow-y-auto max-h-[40vh]">
            <p className="text-2xl font-bold fixed top-0 left-0 px-2 py-2 right-0 z-10 bg-yellow-200">Cart List</p>
            <div className="flex flex-col gap-2 relative top-8 pr-4">
                {
                    cart.map((item) => (
                        <CartCard key={item.id} product={item} />
                    ))
                }
            </div>
        </div>
    );
}

export default CartList;
