import React, { Children, useContext } from "react";
import { MyRouterContext } from "./MyBrowserRouter";

const MyRoutes = ({ children }) => {
  const { currentPath } = useContext(MyRouterContext); //access the context in my routes
  let element;
  Children.forEach(children, (child) => {
    if (currentPath === child.props.path) {
      element = child;
    } //the route
  });
  return element;
};

export default MyRoutes;
