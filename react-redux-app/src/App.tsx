import React from "react";
import { FaPlus } from "react-icons/fa6";
import { Button } from "./components/ui/button";
import { useSelector } from "react-redux";
import { RootState } from "./features/Store";
import { useDispatch } from "react-redux";
import { increment, decrement } from "./features/CounterSlice";
import { FaMinus } from "react-icons/fa6";

const App: React.FC = () => {
  const counter = useSelector((state: RootState) => state.counter.value)
  const dispatch = useDispatch()

  const handleIncrement = () => {
    dispatch(increment())
  }

  const handleDecrement = () => {
    dispatch(decrement())
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex flex-col items-center">
        You have tapped the button
        <span className="text-4xl">{counter}</span>
        times
      </div>
      <Button
        className="mt-4"
        onClick={handleIncrement}> <div className="flex space-x-2 items-center justify-center">
          <FaPlus />
        </div> </Button>
      <Button
        className="mt-4"
        onClick={handleDecrement}> <div className="flex space-x-2 items-center justify-center">
          <FaMinus />
        </div> </Button>
    </div>
  );
}

export default App;

