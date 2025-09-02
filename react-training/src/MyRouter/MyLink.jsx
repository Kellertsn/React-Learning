import React, { useContext } from 'react'
import { MyRouterContext } from './MyBrowserRouter'

const MyLink = (to, children) => {
  const {navigate} = useContext(MyRouterContext);
  const handleClick = () => {
    navigate(to)
  }
  return (
    <a onClick={handleClick}>{children}</a>
  )
}

export default MyLink