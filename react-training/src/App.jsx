import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Todolist from "./components/Todolist/Todolist.jsx";
import CarApp from "./components/ClassComponents/CarApp/CarApp.jsx";
import CourseCatalog from "./components/ClassComponents/7.30 HW/CourseCatalog.jsx";
import ClassDemo from "./components/ClassComponents/ClassDemo.jsx";
import HookDemo from "./components/HookDemo.jsx";
import ClassTodo from "./components/Todolist/ClassTodo.jsx";
import Gameboard from "./components/Tictactoe/Tictactoe.jsx";
import { TodoProvider } from "./components/Todolist/0804 HW/TodoContext.jsx";
import Todolist2 from "./components/Todolist/0804 HW/Todolist2.jsx";



function App() {
  // const [count, setCount] = useState(0)
  // const [show, setShow] = useState(true);
  
  return (
    <>
      {/* <Todolist /> */}
      {/* <ClassTodo /> */}
      {/* <CarApp /> */}
      {/* <CourseCatalog /> */}
      {/* <button id="toggle-btn" onClick={() => setShow(!show)}>
        Toggle show
      </button>
      {show && <HookDemo />} */}
      {/* <Gameboard /> */}
      <TodoProvider>
        <Todolist2 />
      </TodoProvider>
    </>
  );
}

export default App;
