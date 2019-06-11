import * as React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Animated from "react-native-reanimated";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import { decay, clamp, parsePath, getPointAtLength } from "react-native-redash";

const { Value, event, sub, interpolate } = Animated;
const TOUCH_SIZE = 200;
const { width } = Dimensions.get("window");
const white = "white";

interface CursorProps {
  d: string;
  r: number;
  borderWidth: number;
  borderColor: string;
}

export default ({ d, r, borderWidth, borderColor }: CursorProps) => {
  const radius = r + borderWidth / 2;
  const translationX = new Value(0);
  const velocityX = new Value(0);
  const state = new Value(State.UNDETERMINED);
  const onGestureEvent = event([
    {
      nativeEvent: {
        translationX,
        velocityX,
        state
      }
    }
  ]);
  const cx = clamp(decay(translationX, state, velocityX), 0, width);
  const path = parsePath(d);
  const length = interpolate(cx, {
    inputRange: [0, width],
    outputRange: [0, path.totalLength]
  });
  const { y, x } = getPointAtLength(path, length);
  const translateX: any = sub(x, TOUCH_SIZE / 2);
  const translateY: any = sub(y, TOUCH_SIZE / 2);
  return (
    <View style={StyleSheet.absoluteFill}>
      <PanGestureHandler
        onHandlerStateChange={onGestureEvent}
        {...{ onGestureEvent }}
      >
        <Animated.View
          style={{
            transform: [{ translateX }, { translateY }],
            width: TOUCH_SIZE,
            height: TOUCH_SIZE,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <View
            style={{
              width: radius * 2,
              height: radius * 2,
              borderRadius: radius,
              borderColor,
              borderWidth,
              backgroundColor: white
            }}
          />
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};
