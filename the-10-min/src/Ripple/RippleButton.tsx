import React, { Children, ReactNode, cloneElement, useState } from "react";
import { TapGestureHandler } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { StyleSheet, View } from "react-native";
import { useTapGestureHandler } from "react-native-redash";

interface RippleButtonProps {
  children: ReactNode;
  color: string;
}

const RippleButton = ({ children, color }: RippleButtonProps) => {
  const [radius, setRadius] = useState(100);
  const { gestureHandler, position } = useTapGestureHandler();
  const topChild = Children.only(children);
  const newChildren = Children.map(topChild.children, (child, index) => {
    if (index === 0) {
      return (
        <>
          {child}
          <View
            style={StyleSheet.absoluteFill}
            onLayout={({
              nativeEvent: {
                layout: { width, height },
              },
            }) => setRadius(Math.min(width, height))}
          >
            <Animated.View
              style={{
                backgroundColor: color,
                width: radius * 2,
                height: radius * 2,
                borderRadius: radius,
              }}
            />
          </View>
        </>
      );
    }
    return child;
  });
  return (
    <TapGestureHandler {...gestureHandler}>
      {cloneElement(topChild, topChild.props, topChild.children)}
    </TapGestureHandler>
  );
};

export default RippleButton;
