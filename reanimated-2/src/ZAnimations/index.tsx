import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { Examples as ExamplesRoutes } from "../Routes";

import Examples from "./Examples";
import Burger from "./Burger";
import Donut from "./Donut";

const Stack = createStackNavigator<ExamplesRoutes>();

const ExampleNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Examples"
      component={Examples}
      options={{
        title: "3D Examples",
      }}
    />
    <Stack.Screen
      name="Donut"
      component={Donut}
      options={{
        title: "🍩 Domut",
      }}
    />
    <Stack.Screen
      name="Burger"
      component={Burger}
      options={{
        title: "🍔 Burger",
      }}
    />
  </Stack.Navigator>
);

export default ExampleNavigator;
