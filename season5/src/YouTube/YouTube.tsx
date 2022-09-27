import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";

import { Home } from "./Home";

const Tab = createBottomTabNavigator();

export const YouTube = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
    </Tab.Navigator>
  );
};
