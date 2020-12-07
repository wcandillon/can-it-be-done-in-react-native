import { LinearGradient } from "expo-linear-gradient";
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
import Foreground from "./Foreground";

const colors = [
  {
    id: 0,
    start: "#00E0D3",
    end: "#00B4D4",
  },
  {
    id: 1,
    start: "#00B4D4",
    end: "#409CAE",
  },
  {
    id: 2,
    start: "#66D8A4",
    end: "#409CAE",
  },
  {
    id: 3,
    start: "#FC727B",
    end: "#F468A0",
  },
  {
    id: 4,
    start: "#8289EA",
    end: "#7A6FC1",
  },
  {
    id: 5,
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
      <Animated.View style={StyleSheet.absoluteFill}>
        <LinearGradient
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: previousColor.start,
            flexDirection: "row",
            alignItems: "center",
          }}
          colors={[previousColor.start, previousColor.end]}
        >
          <Foreground color={currentColor} />
          <View style={{ width: COLOR_WIDTH }} />
          {colors.map((color, index) => {
            return (
              <Color
                color={color}
                index={index}
                key={index + 1}
                translateX={translateX}
                onPress={() => {
                  if (currentColor.id !== color.id) {
                    translateX.value = withSpring(snapPoints[index]);
                    setCurrentColor(color);
                    setPreviousColor(currentColor);
                  }
                }}
              />
            );
          })}
        </LinearGradient>
      </Animated.View>
    </PanGestureHandler>
  );
};

export default ColorSelection;
