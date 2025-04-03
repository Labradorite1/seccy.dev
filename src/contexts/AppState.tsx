import { useState, createContext, useContext } from "react";
import AppStateType from "../types/AppState";

// The initial state, you can setup any properties initial values here.
const initialState = {
  header: true,
  toasts: [],
};

// create the context object for delivering your state across your app.
const AppStateContext = createContext<[AppStateType, (key: keyof AppStateType, value: any) => void]>([
  initialState,
  () => {},
]);

// custom component to provide the state to your app
export const AppState = (props: any) => {
  // declare the GlobalState
  const [appState, setAppState] = useState(initialState);

  // create a function that'll make it easy to update one state property at a time
  const updateAppState = (key: keyof AppStateType, newValue: any) => {
    setAppState((oldState) => {
      if (oldState[key] !== newValue) {
        const newState = { ...oldState };
        newState[key] = newValue;
        return newState;
      } else {
        return oldState;
      }
    });
  };

  return <AppStateContext.Provider value={[appState, updateAppState]}>{props.children}</AppStateContext.Provider>;
};

// custom hook for retrieving the provided state
export const useAppState = () => useContext(AppStateContext);
