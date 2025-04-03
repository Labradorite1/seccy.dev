import { JSX } from "react";

export default interface AppRoute {
  text: string;
  url: string;
  requiresDefinitions: boolean;
  element: JSX.Element;
  showInNav: boolean;
  group: string;
}
