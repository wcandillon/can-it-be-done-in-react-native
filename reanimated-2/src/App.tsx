import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Routes } from "./Routes";
import Examples from "./Examples";
import PanGesture from "./PanGesture";
import CircularSlider from "./CircularSlider";

const Stack = createStackNavigator<Routes>();
const AppNavigator = () => (
  <>
    <Stack.Navigator>
      <Stack.Screen
        name="Examples"
        component={Examples}
        options={{
          title: "Reanimated 2 Examples",
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
        name="CircularSlider"
        component={CircularSlider}
        options={{
          title: "Circular Slider",
        }}
      />
    </Stack.Navigator>
  </>
);

const App = () => (
  <NavigationContainer>
    <AppNavigator />
  </NavigationContainer>
);

export default App;
