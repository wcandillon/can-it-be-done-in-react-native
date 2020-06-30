import React, { Children, ReactNode, useState } from "react";
import { TapGestureHandler } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { StyleSheet, View } from "react-native";
import { useTapGestureHandler } from "react-native-redash";

interface RippleButtonProps {
  children: ReactNode;
  color: string;
}

const RippleButton = ({ children, color }: RippleButtonProps) => {
  const [radius, setRadius] = useState(-1);
  const { gestureHandler, position } = useTapGestureHandler();
  const child = Children.only(children);
  // const isActive = eq(state)
  return (
    <TapGestureHandler {...gestureHandler}>
      <Animated.View {...child.props} style={[child.props.style]}>
        <View
          style={StyleSheet.absoluteFill}
          onLayout={({
            nativeEvent: {
              layout: { height, width },
            },
          }) => setRadius(Math.max(width, height))}
        >
          {radius !== -1 && (
            <Animated.View
              style={{
                backgroundColor: color,
                borderRadius: radius,
                width: radius * 2,
                height: radius * 2,
              }}
            />
          )}
        </View>
        {child.props.children}
      </Animated.View>
    </TapGestureHandler>
  );
};

export default RippleButton;
