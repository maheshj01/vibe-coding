import React from "react";
import { FaPlus } from "react-icons/fa6";
import { Button } from "./components/ui/button";
import FizzBuzz from "./components/ui/fizzbuzz";
const App: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <FizzBuzz />
    </div>
  );
}

export default App;

