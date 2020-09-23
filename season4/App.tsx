import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { Routes } from "./src/Routes";
import Examples from "./src/Examples";
import Coinbase from "./src/Coinbase";
import Duolingo, { assets as duolingoAssets } from "./src/Duolingo";
import { LoadAssets } from "./src/components";

const fonts = {
  "SFProDisplay-Bold": require("./assets/fonts/SFPro/SF-Pro-Display-Bold.otf"),
  "SFProDisplay-Semibold": require("./assets/fonts/SFPro/SF-Pro-Display-Semibold.otf"),
  "SFProDisplay-Regular": require("./assets/fonts/SFPro/SF-Pro-Display-Regular.otf"),
  "SFProDisplay-Medium": require("./assets/fonts/SFPro/SF-Pro-Display-Medium.otf"),
  "Nunito-Bold": require("./assets/fonts/Nunito/Nunito-Bold.ttf"),
  "Nunito-Regular": require("./assets/fonts/Nunito/Nunito-Regular.ttf"),
};

const assets = [...duolingoAssets];

const Stack = createStackNavigator<Routes>();
const AppNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Examples"
      component={Examples}
      options={{
        title: "Can it be done in React Native?",
      }}
    />
    <Stack.Screen
      name="Duolingo"
      component={Duolingo}
      options={{
        title: "Duolingo",
      }}
    />
    <Stack.Screen
      name="Coinbase"
      component={Coinbase}
      options={{
        title: "Coinbase",
      }}
    />
  </Stack.Navigator>
);

const App = () => {
  return (
    <LoadAssets assets={assets} fonts={fonts}>
      <AppNavigator />
    </LoadAssets>
  );
};

export default App;
