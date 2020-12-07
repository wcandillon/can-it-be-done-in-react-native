import { LinearGradient } from "expo-linear-gradient";
import React, { useRef, useState } from "react";
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

const ColorSelection = () => {
  const position = useRef({ x: 0, y: 0 });
  const translateX = useSharedValue(0);
  const [colorSelection, setColorSelection] = useState({
    previous: colors[0],
    current: colors[0],
  });
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
            backgroundColor: colorSelection.previous.start,
            flexDirection: "row",
            alignItems: "center",
          }}
          colors={[colorSelection.previous.start, colorSelection.previous.end]}
        >
          <Foreground
            color={colorSelection.current}
            position={position.current}
          />
          <View style={{ width: COLOR_WIDTH }} />
          {colors.map((color, index) => {
            return (
              <Color
                color={color}
                index={index}
                key={index + 1}
                translateX={translateX}
                onPress={({ x, y }) => {
                  if (colorSelection.current.id !== color.id) {
                    translateX.value = withSpring(snapPoints[index]);
                    position.current = { x, y };
                    console.log(position.current);
                    setColorSelection({
                      previous: colorSelection.current,
                      current: color,
                    });
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
