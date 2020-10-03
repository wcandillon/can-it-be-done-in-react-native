import React from "react";
import { View } from "react-native";
import { useSharedValue } from "react-native-reanimated";

import StaticTabbar from "./StaticTabbar";

interface TabbarProps {}

const Tabbar = () => {
  const open = useSharedValue(0);
  return (
    <View>
      <StaticTabbar />
    </View>
  );
};

export default Tabbar;
