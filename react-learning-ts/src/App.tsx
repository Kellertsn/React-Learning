import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { ThemeContext } from "./react";
import { MyComponent } from "./react";
import type { Theme } from "./react";

function App() {
  const [theme, setTheme] = useState<Theme>("light");

  return (
    <>
      <ThemeContext value={theme}>
        <MyComponent />
      </ThemeContext>
    </>
  );
}

export default App;
