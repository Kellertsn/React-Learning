// url => what UI to show to the users

import { BrowserRouter } from "react-router";

// ReactDOM.createRoot(root).render(
//   //like context provider
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>
// );


{/* <BrowserRouter>
<Link>
<Routers>
<Route>
history (won't refresh the page whenever call one of the methods)
location (will refresh the page) */}  // use these two to sync react state with the browser state


// routes decides what to show for the current location (specific url).
// route configures the element corresponding to this specific path.
import { createContext, useEffect, useState } from "react";

export const MyRouterContext = createContext(null);

const MyBrowserRouter = ({children}) => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  console.log(currentPath);

  useEffect(()=>{
    const handlePopState = () => {
      setCurrentPath(window.location.pathname)
    }
    window.addEventListener('popState', handlePopState)
    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  const navigate = (to) => {
    window.history.pushState({}, "", to) // add new page to the history state (not going to trigger a page reload)
    setCurrentPath(to); //only setting the application state, but also need to update the history state
  };

  return (
    <MyRouterContext value={(currentPath, navigate)}>{children}</MyRouterContext> //let other component to know what v? some info about the current path and also the function to trigger nav logic
  );
};

export default MyBrowserRouter;
