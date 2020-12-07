import React, { useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { snapPoint } from "react-native-redash";

import Color, { COLOR_WIDTH } from "./Color";
import Background from "./Background";

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
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Background
            colorSelection={colorSelection}
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
                    setColorSelection({
                      previous: colorSelection.current,
                      current: color,
                    });
                  }
                }}
              />
            );
          })}
        </View>
      </Animated.View>
    </PanGestureHandler>
  );
};

export default ColorSelection;
