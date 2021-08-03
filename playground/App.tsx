import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { Routes } from "./src/Routes";
import LoadAssets from "./src/components/LoadAssets";
import Playground from "./src/Examples";
import RotaryLogin from "./src/RotaryLogin";

const fonts = {
  "SFProDisplay-Bold": require("./assets/fonts/SFPro/SF-Pro-Display-Bold.otf"),
  "SFProDisplay-Semibold": require("./assets/fonts/SFPro/SF-Pro-Display-Semibold.otf"),
  "SFProDisplay-Regular": require("./assets/fonts/SFPro/SF-Pro-Display-Regular.otf"),
  "SFProDisplay-Medium": require("./assets/fonts/SFPro/SF-Pro-Display-Medium.otf"),
};

const Stack = createStackNavigator<Routes>();
const AppNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Playground"
      component={Playground}
      options={{
        title: "Playground",
      }}
    />
    <Stack.Screen
      name="RotaryLogin"
      component={RotaryLogin}
      options={{
        title: "Rotary Login",
      }}
    />
  </Stack.Navigator>
);

const App = () => {
  return (
    <LoadAssets assets={[]} fonts={fonts}>
      <AppNavigator />
    </LoadAssets>
  );
};

export default App;
