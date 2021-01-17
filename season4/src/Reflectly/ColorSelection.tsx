import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { snapPoint } from "react-native-redash";

import Color, { COLOR_WIDTH } from "./Color";
import BackgroundGL from "./BackgroundGL";

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  placeholder: {
    width: COLOR_WIDTH,
  },
});

const ColorSelection = () => {
  const [colorSelection, setColorSelection] = useState({
    previous: colors[0]!,
    current: colors[0]!,
    position: { x: 0, y: 0 },
  });
  const translateX = useSharedValue(0);
  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { x: number }
  >({
    onStart: (_, ctx) => {
      ctx.x = translateX.value;
    },
    onActive: ({ translationX }, { x }) => {
      translateX.value = x + translationX;
    },
    onEnd: ({ velocityX }) => {
      const dest = snapPoint(translateX.value, velocityX, snapPoints);
      translateX.value = withSpring(dest);
    },
  });
  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View style={styles.container}>
        <BackgroundGL colorSelection={colorSelection} />
        <View style={styles.placeholder} />
        {colors.map((color, index) => {
          return (
            <Color
              color={color}
              key={index}
              index={index}
              translateX={translateX}
              onPress={(position) => {
                translateX.value = withSpring(-index * COLOR_WIDTH);
                setColorSelection({
                  position,
                  previous: colorSelection.current,
                  current: color,
                });
              }}
            />
          );
        })}
      </Animated.View>
    </PanGestureHandler>
  );
};

export default ColorSelection;
