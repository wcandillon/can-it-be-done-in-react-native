import React, { ReactElement, cloneElement } from "react";
import { StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";

interface ActiveProps {
  children: ReactElement;
  active: Animated.Node<0 | 1>;
}

export default ({ children, active }: ActiveProps) => {
  return (
    <View>
      {children}
      <Animated.View
        style={{ ...StyleSheet.absoluteFillObject, opacity: active }}
      >
        {cloneElement(children, { color: "white" })}
      </Animated.View>
    </View>
  );
};
