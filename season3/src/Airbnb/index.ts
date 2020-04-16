import { createSharedElementStackNavigator } from "react-navigation-shared-element";

import Explore from "./Explore";
import Listing from "./Listing";

export const assets = [
  require("./assets/tiny-home.jpg"),
  require("./assets/cook-house.jpg"),
  require("./assets/host.jpg"),
];

export const fonts = {
  CerealBook: require("./assets/fonts/AirbnbCerealBook.ttf"),
  CerealMedium: require("./assets/fonts/AirbnbCerealMedium.ttf"),
  CerealLight: require("./assets/fonts/AirbnbCerealLight.ttf"),
};

export default createSharedElementStackNavigator(
  {
    Explore,
    Listing,
  },
  {
    mode: "modal",
    headerMode: "none",
    defaultNavigationOptions: {
      cardStyleInterpolator: ({ current: { progress } }) => {
        const opacity = progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
          extrapolate: "clamp",
        });
        return { cardStyle: { opacity } };
      },
      gestureEnabled: false,
      cardStyle: {
        backgroundColor: "transparent",
      },
    },
  }
);
