import Loading from "../src/components/pages/loading/Loading";
import Homepage from "../src/components/pages/homepage/Homepage";
import AppRoute from "../src/types/AppRoute";
import Settings from "../src/components/pages/settings/Settings";

const routes: AppRoute[] = [
  {
    text: "home",
    url: "/*",
    requiresDefinitions: false,
    element: <Homepage />,
    showInNav: false,
    group: "",
  },
  {
    text: "loading",
    url: "/loading",
    requiresDefinitions: false,
    element: <Loading />,
    showInNav: false,
    group: "",
  },
  {
    text: "home",
    url: "/home",
    requiresDefinitions: false,
    element: <Homepage />,
    showInNav: false,
    group: "",
  },
  {
    text: "settings",
    url: "/settings",
    requiresDefinitions: false,
    element: <Settings />,
    showInNav: false,
    group: "",
  },
  {
    text: "Spy",
    url: "/spy",
    requiresDefinitions: true,
    element: <h3>Spy page!</h3>,
    showInNav: true,
    group: "",
  },
  {
    text: "Testing",
    url: "/testing",
    requiresDefinitions: false,
    element: <h3>Testing</h3>,
    showInNav: true,
    group: "test",
  },
];

export default routes;
