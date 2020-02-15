import { createSharedElementStackNavigator } from "react-navigation-shared-element";

import Explore from "./Explore";
import Listing from "./Listing";

export const assets = [
  require("./assets/tiny-home.jpg"),
  require("./assets/cook-house.jpg")
];

export default createSharedElementStackNavigator(
  {
    Explore,
    Listing
  },
  {
    mode: "modal",
    headerMode: "none"
  }
);
