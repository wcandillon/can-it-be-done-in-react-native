import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { Examples as ExamplesRoutes } from "../Routes";

import Examples from "./Examples";
import Cone from "./Cone";
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
        title: "🍩 Donut",
      }}
    />
    <Stack.Screen
      name="Cone"
      component={Cone}
      options={{
        title: "📐 Cone",
      }}
    />
  </Stack.Navigator>
);

export default ExampleNavigator;
