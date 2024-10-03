import React, { useState } from 'react';
import { Button } from './button';

function FizzBuzz() {
  const [inputNumber, setInputNumber] = useState<string>('');
  const [output, setOutput] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || (Number(value) >= 1 && /^\d+$/.test(value))) {
      setInputNumber(value);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputNumber && Number(inputNumber) > 0) {
      generateFizzBuzz(Number(inputNumber));
    } else {
      alert('Please enter a valid number');
    }
  };

  const generateFizzBuzz = (n: number) => {
    let result = [];
    for (let i = 1; i <= n; i++) {
      if (i % 3 === 0 && i % 5 === 0) {
        result.push('FizzBuzz');
      } else if (i % 3 === 0) {
        result.push('Fizz');
      } else if (i % 5 === 0) {
        result.push('Buzz');
      } else {
        result.push(i.toString());
      }
    }
    setOutput(result);
  };

  return (
    <div className="flex flex-col">
      <div className='sticky top-0'>
        <h1 className='sticky top-0'>FizzBuzz Generator</h1>
        <form onSubmit={handleSubmit} className='flex space-x-2'>
          <input
            type="number"
            className='px-2 py-1 border border-gray-300 rounded no-spinner w-[200px]'
            value={inputNumber}
            onChange={handleChange}
            min="1"
            max={"10000"}
            placeholder="Enter a positive number"
          />
          <Button type="submit">Generate</Button>
        </form>
      </div>
      <div className="pt-16">
        {output.length > 0 &&
          output.map((item, index) => (
            <div key={index}>
              {item}
            </div>
          ))}
      </div>
    </div>
  );
}

export default FizzBuzz;
