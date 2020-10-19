import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { LoadAssets } from "./src/components";
import { Routes } from "./src/Routes";
import Examples from "./src/Examples";
import PanGesture from "./src/PanGesture";
import Transitions from "./src/Transitions";
import Worklets from "./src/Worklets";
import Coinbase from "./src/Coinbase";
import JellyScroll from "./src/JellyScroll";
import MaskedView from "./src/MaskedView";
import Accordion from "./src/Accordion";
import Wave from "./src/Wave";
import Fluid from "./src/Fluid";
import StrokeAnimation, {assets as strokeAnimationAssets} from "./src/StrokeAnimation";

const assets = [...strokeAnimationAssets];
const Stack = createStackNavigator<Routes>();
const AppNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Examples"
      component={Examples}
      options={{
        title: "Reanimated 2 Examples",
      }}
    />
    <Stack.Screen
      name="Worklets"
      component={Worklets}
      options={{
        title: "Worklets",
      }}
    />
    <Stack.Screen
      name="PanGesture"
      component={PanGesture}
      options={{
        title: "PanGesture",
      }}
    />
    <Stack.Screen
      name="Transitions"
      component={Transitions}
      options={{
        title: "Transitions",
      }}
    />
    <Stack.Screen
      name="Chart"
      component={Coinbase}
      options={{
        title: "Coinbase",
        header: () => null,
      }}
    />
    <Stack.Screen
      name="JellyScroll"
      component={JellyScroll}
      options={{
        title: "Jelly Scroll",
      }}
    />
    <Stack.Screen
      name="MaskedView"
      component={MaskedView}
      options={{
        title: "Masked View",
      }}
    />
    <Stack.Screen
      name="Accordion"
      component={Accordion}
      options={{
        title: "Accordion",
      }}
    />
    <Stack.Screen
      name="Wave"
      component={Wave}
      options={{
        title: "Wave",
      }}
    />
    <Stack.Screen
      name="Fluid"
      component={Fluid}
      options={{
        title: "Soft Body Fluid",
      }}
    />
    <Stack.Screen
      name="StrokeAnimation"
      component={StrokeAnimation}
      options={{
        title: "Stroke Animation",
      }}
    />
  </Stack.Navigator>
);

const App = () => (
  <LoadAssets assets={assets} fonts={{}}>
    <AppNavigator />
  </LoadAssets>
);

export default App;
