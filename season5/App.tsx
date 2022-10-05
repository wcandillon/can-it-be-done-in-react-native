import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import type { Routes } from "./src/Routes";
import { Examples } from "./src/Examples";
import { YouTube } from "./src/YouTube";
import { Shazam } from "./src/Shazam";
import { LoadAssets } from "./src/components/LoadAssets";
import { VideoModal } from "./src/YouTube/VideoModal";
import { Breathe } from "./src/Breathe";
import { SongOfBloom } from "./src/SongOfBloom";

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
      name="YouTube"
      component={YouTube}
      options={{
        title: "📺 YouTube",
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="Shazam"
      component={Shazam}
      options={{
        title: "🎧 Shazam",
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="Breathe"
      component={Breathe}
      options={{
        title: "🧘🏻‍♀️ Breathe",
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
    <Stack.Screen
      name="Video"
      component={VideoModal}
      options={{
        headerShown: false,
        presentation: "transparentModal",
        gestureEnabled: false,
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
