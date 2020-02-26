import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import Animated, {
  Extrapolate,
  Value,
  call,
  concat,
  cond,
  diffClamp,
  divide,
  eq,
  interpolate,
  multiply,
  round,
  sub,
  useCode
} from "react-native-reanimated";
import { ReText, onGestureEvent, withOffset } from "react-native-redash";

import Knob, { KNOB_SIZE } from "./Knob";
import { StyleGuide } from "../components";

const { width } = Dimensions.get("window");
const SLIDER_WIDTH = width - 150;
const RULER_HEIGHT = 20;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#a9cbee",
    justifyContent: "center",
    alignItems: "center"
  },
  slider: {
    width: SLIDER_WIDTH,
    height: KNOB_SIZE,
    justifyContent: "center"
  },
  backgroundSlider: {
    height: RULER_HEIGHT,
    backgroundColor: "white"
  },
  sides: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  left: {
    height: RULER_HEIGHT,
    width: RULER_HEIGHT,
    borderRadius: RULER_HEIGHT / 2,
    backgroundColor: StyleGuide.palette.primary,
    left: -RULER_HEIGHT / 2
  },
  right: {
    left: RULER_HEIGHT / 2,
    height: RULER_HEIGHT,
    width: RULER_HEIGHT,
    borderRadius: RULER_HEIGHT / 2,
    backgroundColor: "white"
  }
});

export default () => {
  const state = new Value(State.UNDETERMINED);
  const translationX = new Value(0);
  const gestureHandler = onGestureEvent({ state, translationX });
  const x = diffClamp(withOffset(translationX, state), 0, SLIDER_WIDTH);
  const translateX = sub(x, KNOB_SIZE / 2);
  const rotate = interpolate(x, {
    inputRange: [0, SLIDER_WIDTH],
    outputRange: [0, 4 * Math.PI]
  });
  const scaleX = interpolate(x, {
    inputRange: [0, SLIDER_WIDTH],
    // https://github.com/facebook/react-native/issues/6278
    outputRange: [0.0001, 1]
  });
  const value = round(multiply(divide(x, SLIDER_WIDTH), 100));
  const label = concat(value);
  useCode(
    () =>
      cond(
        eq(state, State.END),
        // eslint-disable-next-line no-console
        call([value], ([v]) => console.log({ v }))
      ),
    [state, value]
  );
  return (
    <View style={styles.container}>
      <View style={styles.slider}>
        <View>
          <View style={styles.backgroundSlider} />
          <View style={styles.sides}>
            <View style={styles.left} />
            <View style={styles.right} />
          </View>
          <Animated.View
            style={[
              styles.backgroundSlider,
              {
                ...StyleSheet.absoluteFillObject,
                backgroundColor: StyleGuide.palette.primary,
                transform: [
                  { translateX: -SLIDER_WIDTH / 2 },
                  { scaleX },
                  { translateX: SLIDER_WIDTH / 2 }
                ]
              }
            ]}
          />
        </View>
        <PanGestureHandler minDist={0} {...gestureHandler}>
          <Animated.View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: KNOB_SIZE,
              height: KNOB_SIZE,
              transform: [{ translateX }]
            }}
          >
            <Animated.View
              style={{
                ...StyleSheet.absoluteFillObject,
                transform: [{ rotate }]
              }}
            >
              <Knob {...{ state }} />
            </Animated.View>
          </Animated.View>
        </PanGestureHandler>
      </View>
      <ReText text={label} />
    </View>
  );
};
