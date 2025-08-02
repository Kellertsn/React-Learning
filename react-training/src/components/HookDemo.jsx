import React, { useState, useEffect, useRef, useCallback } from "react";

const HookDemo = () => {
  const [counter, setCounter] = useState(0);
  const [toggle, setToggle] = useState(true);

  const counterRef = useRef(null);
  console.log(counterRef);

  const inputRef = useRef();
  console.log(inputRef);

  const handleAdd = () => {
    // setCounter(counter + 1);
    // setCounter(counter + 1);
    counterRef.current = counter + 1;

    setCounter((prev) => {
      return prev + 1;
    });
    setCounter((prev) => {
      return prev + 1;
    });
  };

  // const handleToggle = useCallback((value) => {
  //   setToggle(!value);
  //   inputRef.current.focus();
  // }, []);

  const handleToggle = (value) => {
    setToggle(!value);
    inputRef.current.focus();
  };

  const fnRef = useRef(handleToggle);

  console.log(fnRef.current === handleToggle);

  // equivalent of componentDidMount
  // useEffect(() => {
  //   console.log("in useEffect with empty dependency array");
  // }, []);

  // equivalent of componentDidMount + componentDidUpdate only if values in dependency array changes
  // useEffect(() => {
  //   console.log("in useEffect with dependency array");

  //   /**
  //    * initial render -> 1st useEffect
  //    * update -> cleanup for the 1st useEffect -> 2nd useEffect
  //    * update -> cleanup for the 2nd useEffect -> 3rd useEffect
  //    * unmounting -> cleanup for the 3rd useEffect
  //    */

  //   return () => {
  //     console.log("clean up for toggle");
  //   };
  // }, [toggle]);

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     console.log("interval is running");
  //   }, 1000);

  //   return () => {
  //     // cleanup function
  //     console.log("clean up");
  //     clearInterval(intervalId);
  //   };
  // }, []);

  // equivalent of componentDidMount + componentDidUpdate
  // useEffect(() => {
  //   console.log("in useEffect");
  // });

  useEffect(() => {
    setTimeout(() => {
      console.log(counterRef.current);
    }, 2000);
  }, []);

  return (
    <div>
      <input ref={inputRef} />
      <p>Counter: {counter}</p>
      <button onClick={handleAdd}>Add 2 to counter</button>
      <p>Toggle Value: {toggle ? "true" : "false"}</p>
      <button onClick={() => handleToggle(toggle)}>Toggle</button>
    </div>
  );
};

export default HookDemo;