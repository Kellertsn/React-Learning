import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Todolist from './components/Todolist/Todolist.jsx'
import CarApp from './components/ClassComponents/CarApp/CarApp.jsx'
import CourseCatalog from './components/ClassComponents/7.30 HW/CourseCatalog.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <Todolist /> */}
      {/* <CarApp /> */}
      <CourseCatalog />
    </>
  )
}

export default App
