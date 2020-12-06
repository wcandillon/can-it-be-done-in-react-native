import React, { useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  runOnUI,
  useAnimatedGestureHandler,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { snapPoint } from "react-native-redash";

import Color, { COLOR_WIDTH } from "./Color";

const colors = [
  {
    start: "#00E0D3",
    end: "#00B4D4",
  },
  {
    start: "#00B4D4",
    end: "#409CAE",
  },
  {
    start: "#66D8A4",
    end: "#409CAE",
  },
  {
    start: "#FC727B",
    end: "#F468A0",
  },
  {
    start: "#8289EA",
    end: "#7A6FC1",
  },
  {
    start: "#FEC7A3",
    end: "#FD9F9C",
  },
];
const snapPoints = colors.map((_, i) => -i * COLOR_WIDTH);
console.log({ snapPoints });

const ColorSelection = () => {
  const translateX = useSharedValue(0);
  const [previousColor, setPreviousColor] = useState(colors[0]);
  const [currentColor, setCurrentColor] = useState(colors[0]);
  const onGestureEvent = useAnimatedGestureHandler<{ x: number }>({
    onStart: (_, ctx) => {
      ctx.x = translateX.value;
    },
    onActive: ({ translationX }, ctx) => {
      translateX.value = translationX + ctx.x;
    },
    onEnd: ({ velocityX }) => {
      const snapTo = snapPoint(translateX.value, velocityX, snapPoints);
      translateX.value = withSpring(snapTo);
    },
  });
  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          {
            backgroundColor: currentColor.start,
            flexDirection: "row",
            alignItems: "center",
          },
        ]}
      >
        <View style={{ width: COLOR_WIDTH }} />
        {colors.map((color, index) => {
          return (
            <Color
              color={color}
              index={index}
              key={index + 1}
              translateX={translateX}
              onPress={() => {
                //setPreviousColor(currentColor);
                //setCurrentColor(color);
              }}
            />
          );
        })}
      </Animated.View>
    </PanGestureHandler>
  );
};

export default ColorSelection;
