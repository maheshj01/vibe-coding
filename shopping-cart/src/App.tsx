import React, { useEffect } from "react";
import { FaCartPlus } from "react-icons/fa6";
import Header from "./components/ui/Header";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./features/Store";
import { setProducts } from "./features/productSlice";
import ProductsGrid from "./components/ProductsGrid";
import "./App.css";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './components/ui/popover';
import CartList from "./components/CartList";

const App: React.FC = () => {
  const data = {
    products: [
      {
        id: 1,
        name: "Nike Air Jordan",
        currency: "USD",
        price: 100,
        stock: 10,
        image: "https://via.placeholder.com/150",
      },
      {
        id: 2,
        name: "Adidas Yeezy",
        currency: "USD",
        price: 200,
        stock: 5,
        image: "https://via.placeholder.com/150",
      },
      {
        id: 3,
        name: "Puma RS-X",
        currency: "USD",
        price: 150,
        stock: 2,
        image: "https://via.placeholder.com/150",
      },
      {
        id: 4,
        name: "Converse Chuck Taylor",
        currency: "USD",
        price: 80,
        stock: 15,
        image: "https://via.placeholder.com/150",
      },
      // Generate 20 more products
      ...Array(20).fill(null).map((_, i) => ({
        id: i + 5,
        name: `Product ${i + 5}`,
        currency: "USD",
        price: 100 + i * 10,
        stock: 10 + i,
        image: "https://via.placeholder.com/150",
      })),
    ],
  };


  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.products);
  const cart = useSelector((state: RootState) => state.products.cart);
  const cartCount = cart.length;


  useEffect(() => {
    dispatch(setProducts(data.products));
  }, [dispatch]);

  return (
    <div className="flex flex-col h-screen">
      <Header title="Product List" className="navbar h-16 bg-slate-500">
        <Popover>
          <PopoverTrigger>
            <div className="flex gap-2 hover:bg-blue-200 hover:p-2 rounded-md">
              <FaCartPlus className="text-2xl text-white" />
              <span className="text-white">{`(${cartCount})`}</span>
            </div>
          </PopoverTrigger>
          <PopoverContent>
            <CartList />
          </PopoverContent>
        </Popover>
      </Header>
      <div className="h-full overflow-y-auto p-4 mt-16">
        {products.length > 0 ? <ProductsGrid /> : <p>No products found</p>}
      </div>
    </div>
  );
}

export default App;

