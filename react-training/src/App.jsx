import { useState } from "react";
import { Provider } from "react-redux";
import "./App.css";
import Todolist from "./components/Todolist/Todolist.jsx";
import CarApp from "./components/ClassComponents/CarApp/CarApp.jsx";
import CourseCatalog from "./components/ClassComponents/7.30 HW/CourseCatalog.jsx";
import ClassDemo from "./components/ClassComponents/ClassDemo.jsx";
import HookDemo from "./components/HookDemo.jsx";
import ClassTodo from "./components/Todolist/ClassTodo.jsx";
import Gameboard from "./components/Tictactoe/Tictactoe.jsx";
import { TodoProvider } from "./components/Todolist/0804 HW/TodoContext.jsx";
// import Todolist2 from "./components/Todolist/0804 HW/Todolist2.jsx";
// import Todolist2 from "./components/Store/0806 HW/Todolist2.jsx";
// import { store } from './components/Store/0806 HW/store.jsx';
import Todolist2 from "./components/Store/0807 HW/Todolist2.jsx";
import { store } from "./components/Store/0807 HW/store.jsx";
import MyBrowserRouter from "./MyRouter/MyBrowserRouter.jsx";
import MyRoutes from "./MyRouter/MyRoutes.jsx";
import MyRoute from "./MyRouter/MyRoute.jsx";
import MyLink from "./MyRouter/MyLink.jsx";

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
      {/* <TodoProvider>
        <Todolist2 />
        </TodoProvider> */}
      {/* <Provider store={store}>
        <Todolist2 />
      </Provider> */}
      <nav>
        <MyLink to="/todolist">Todo List</MyLink>
      </nav>

      <Provider store={store}>
        <MyBrowserRouter>
          <MyRoutes>
            <MyRoute path="/todolist2" element={<Todolist2 />} />
            <MyRoute path="/counter" element={<Counter />} />
          </MyRoutes>
        </MyBrowserRouter>
      </Provider>
    </>
  );
}

export default App;
