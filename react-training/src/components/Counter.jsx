import React, { useState } from "react";

const Counter = ({counter, handleIncrement, handleDecrement}) => {
//   const [counter, setCounter] = useState(0);

//   const handleIncrement = () => {
//     setCounter((prev) => prev + 1);

//     setTimeout(() => {
//       console.log("timeout:", counter);
//     }, 500);
//   };

//   console.log(3, counter);

  return (
    <div>
      <div>{counter}</div>
      <button onClick={handleIncrement}>increment</button>
      <button onClick={handleDecrement}>decrement</button>
    </div>
  );
};
const CounterWithHOC = withCounter(Counter)
export default CounterWithHOC;