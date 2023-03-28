import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import type { Routes } from "./src/Routes";
import { Examples } from "./src/Examples";
import { Headspace } from "./src/Headspace";
import { Riveo } from "./src/Riveo";
import { SongOfBloom } from "./src/SongOfBloom";
import { LoadAssets } from "./src/components";

import "./libs.d";

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
      name="Headspace"
      component={Headspace}
      options={{
        title: "🟠 Headspace",
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="Riveo"
      component={Riveo}
      options={{
        title: "📼 Riveo",
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="SongOfBloom"
      component={SongOfBloom}
      options={{
        title: "*️⃣ Song of Bloom",
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
