import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { Routes } from "./Routes";
import Examples from "./Examples";
import Coinbase from "./Coinbase";
import Duolingo from "./Duolingo";

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

const App = () => (
  <NavigationContainer>
    <AppNavigator />
  </NavigationContainer>
);

export default App;
