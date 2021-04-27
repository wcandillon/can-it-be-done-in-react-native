import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { LogBox } from "react-native";

import { LoadAssets, assets as globalAssets } from "./src/components";
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
import ZAnimations from "./src/ZAnimations";
import StrokeAnimation from "./src/StrokeAnimation";
import StickyShapes from "./src/StickyShapes";
import DVDLogo from "./src/DVDLogo";
import Breathe from "./src/Breathe";
import Nokia from "./src/Nokia";
import PizzaChallenge, { assets as pizzaAsset } from "./src/PizzaChallenge";

const fonts = {
  "SFProDisplay-Bold": require("./assets/fonts/SFPro/SF-Pro-Display-Bold.otf"),
  "SFProDisplay-Semibold": require("./assets/fonts/SFPro/SF-Pro-Display-Semibold.otf"),
  "SFProDisplay-Regular": require("./assets/fonts/SFPro/SF-Pro-Display-Regular.otf"),
  "SFProDisplay-Medium": require("./assets/fonts/SFPro/SF-Pro-Display-Medium.otf"),
  Antpolt: require("./assets/fonts/antpoltsemicond-bolditalic.ttf"),
};

LogBox.ignoreLogs(["WARNING: Multiple instances of Three.js being imported."]);

const assets = [...globalAssets, ...pizzaAsset];
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
    <Stack.Screen
      name="ZAnimations"
      component={ZAnimations}
      options={{
        title: "ZAnimations",
      }}
    />
    <Stack.Screen
      name="StickyShapes"
      component={StickyShapes}
      options={{
        title: "Sticky Shapes",
        header: () => null,
      }}
    />
    <Stack.Screen
      name="DVDLogo"
      component={DVDLogo}
      options={{
        title: "DVD Logo",
        header: () => null,
      }}
    />
    <Stack.Screen
      name="PizzaChallenge"
      component={PizzaChallenge}
      options={{
        title: "🍕 Pizza Challenge",
      }}
    />
    <Stack.Screen
      name="Breathe"
      component={Breathe}
      options={{
        title: "🧘 Breathe",
      }}
    />
    <Stack.Screen
      name="Nokia"
      component={Nokia}
      options={{
        title: "📱 Nokia",
      }}
    />
  </Stack.Navigator>
);

const App = () => (
  <LoadAssets assets={assets} fonts={fonts}>
    <AppNavigator />
  </LoadAssets>
);

export default App;
