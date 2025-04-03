import { BrowserRouter, Route, Routes } from "react-router-dom";
import routes from "../../../data/routes";
import DefinitionUser from "./DefinitionUser";
import Toasts from "../toasts/Toasts";
import { useAppState } from "../../contexts/AppState";
import Header from "../layout/Header";

export default function Router() {
  const [appState, _] = useAppState();

  return (
    <BrowserRouter>
      {appState.header && <Header />}
      <Toasts />
      <Routes>
        {routes.map((route) => (
          <Route
            path={route.url}
            element={route.requiresDefinitions ? <DefinitionUser>{route.element}</DefinitionUser> : route.element}
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
}
