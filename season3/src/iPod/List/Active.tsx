import React, { ReactElement, cloneElement } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import Animated from "react-native-reanimated";

interface ActiveProps {
  children: ReactElement;
  active: Animated.Node<0 | 1>;
  style?: ViewStyle;
}

export default ({ children, active, style }: ActiveProps) => {
  return (
    <View {...{ style }}>
      {children}
      <Animated.View
        style={{ ...StyleSheet.absoluteFillObject, opacity: active }}
      >
        {cloneElement(children, {
          style: [children.props.style, { color: "white" }]
        })}
      </Animated.View>
    </View>
  );
};
