import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { Routes } from "./Routes";
import Examples from "./Examples";
import PanGesture from "./PanGesture";
import Transitions from "./Transitions";
import Worklets from "./Worklets";
import Coinbase from "./Coinbase";
import JellyScroll from "./JellyScroll";
import MaskedView from "./MaskedView";
import Accordion from "./Accordion";
import Wave from "./Wave";
import Fluid from "./Fluid";

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
  </Stack.Navigator>
);

const App = () => (
  <NavigationContainer>
    <AppNavigator />
  </NavigationContainer>
);

export default App;
