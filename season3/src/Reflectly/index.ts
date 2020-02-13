import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import Home from "./Home";
import Note from "./Note";

export default createSharedElementStackNavigator(
  {
    Home,
    Note
  },
  {}
);
