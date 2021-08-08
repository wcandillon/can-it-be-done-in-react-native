import React from "react";
import { View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

import Gesture from "./Gesture";
import { RADIUS } from "./Quadrant";

const Test = () => {
  const theta = useSharedValue(0);
  const style = useAnimatedStyle(() => ({
    backgroundColor: "red",
    width: RADIUS * 2,
    height: RADIUS * 2,
    transform: [{ rotate: `${-theta.value}rad` }],
  }));
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Animated.View style={style} />
      <Gesture theta={theta} />
    </View>
  );
};

export default Test;
