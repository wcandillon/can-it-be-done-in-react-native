import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import type { Routes } from "./src/Routes";
import { Examples } from "./src/Examples";
import { PathGradient } from "./src/PathGradient";
import { LoadAssets } from "./src/LoadAssets";
import { JoyOfPainting } from "./src/JoyOfPainting";
import { BlurGradientDemo } from "./src/BlurGradient";
import { Wallpaper } from "./src/Wallpaper";
import { Rings } from "./src/Rings";

const fonts = {};
const assets: number[] = [];
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
      name="PathGradient"
      component={PathGradient}
      options={{
        title: "🌈 PathGradient",
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="JoyOfPainting"
      component={JoyOfPainting}
      options={{
        title: "🎨 Joy of Painting",
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="BlurGradient"
      component={BlurGradientDemo}
      options={{
        title: "🌫️ Blur Gradient",
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="Wallpaper"
      component={Wallpaper}
      options={{
        title: "🍏 Wallpaper",
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="Rings"
      component={Rings}
      options={{
        title: "🏋️‍♂️ Fitness Rings",
        headerShown: false,
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

// eslint-disable-next-line import/no-default-export
export default App;
