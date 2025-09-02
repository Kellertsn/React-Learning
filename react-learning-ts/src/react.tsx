import { useCallback, useReducer, useState } from "react";

interface MyButtonProps {
  title: string;
  disabled: boolean;
}

function Mybutton({ title, disabled }: MyButtonProps) {
  return <button disabled={disabled}>{title}</button>;
}

// const [a, setA] = useState(false);
// const [a, setAB] = useState<boolean>(false);

type Status = "idle" | "loading" | "success" | "error";
// const [status, setStatus] = useState<Status>("idle");

type RequestState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: any }
  | { status: "error"; error: Error };

// const [requestState, setRequestState] = useState<RequestState>({status: "idle"})

// useReducer takes a reducer function and an initial state
interface State {
  count: number;
}

type CounterAction =
  | { type: "reset" }
  | { type: "setCount"; value: State["count"] };

const initialState: State = { count: 0 };

function stateReducer(state: State, action: CounterAction): State {
  switch (action.type) {
    case "reset":
      return initialState;
    case "setCount":
      return { ...state, count: action.value };
    default:
      throw new Error("Unknown action");
  }
}

//useContext
import { createContext, useContext } from "react";
export type Theme = "light" | "dark" | "system";

export const ThemeContext = createContext<Theme>("system");

export const useGetTheme = () => useContext(ThemeContext);

export function MyComponent() {
  const theme = useGetTheme();

  return <div>current theme: {theme}</div>;
}

// if there's no default(null)
type ComplexObject = {
  kind: string;
};
// The context is created with `| null` in the type, to accurately reflect the default value.
const Context = createContext<ComplexObject | null>(null);
// The `| null` will be removed via the check in the Hook.
const useGetComplexObject = () => {
  const object = useContext(Context);
  if (!object) {
    throw new Error("useGetComplexObject must be used within a Provider");
  }
  return object;
};

// function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
//   setValue(event.currentTarget.value);
// }

// const handleChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
//   (event) => {
//     setInput(event.currentTarget.value);
//   },
//   [setInput]
// );

//children
interface Modal {
  title: string;
  childeren : React.ReactNode;
}

interface ModalRendererProps {
  title: string;
  children: React.ReactElement;
}



//css
interface MyComponentProps {
  style: React.CSSProperties;
}

export function cool({ style }: MyComponentProps) {
  return(
    <div style={style}></div>
  )
}