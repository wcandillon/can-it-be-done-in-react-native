import React from "react";
import { StyleSheet, View } from "react-native";

import { PanGestureHandler, State } from "react-native-gesture-handler";
import Animated, { add, cond, eq, modulo, sub } from "react-native-reanimated";
import { onGestureEvent, useValues } from "react-native-redash";
import data from "./data.json";
import Chart, { size } from "./Chart";
import Header from "./Header";
import Line from "./Line";

const candles = data.slice(0, 20);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black"
  }
});

export default () => {
  const [x, y, state] = useValues([0, 0, State.UNDETERMINED], []);
  const gestureHandler = onGestureEvent({
    x,
    y,
    state
  });
  const caliber = size / candles.length;
  const translateX = add(sub(x, modulo(x, caliber)), caliber / 2);
  const opacity = eq(state, State.ACTIVE);
  return (
    <View style={styles.container}>
      <Header />
      <View>
        <Chart {...{ candles }} />
        <PanGestureHandler {...gestureHandler}>
          <Animated.View style={StyleSheet.absoluteFill}>
            <Animated.View
              style={{
                transform: [{ translateY: y }],
                opacity,
                ...StyleSheet.absoluteFillObject
              }}
            >
              <Line x={size} y={0} />
            </Animated.View>
            <Animated.View
              style={{
                transform: [{ translateX }],
                opacity,
                ...StyleSheet.absoluteFillObject
              }}
            >
              <Line x={0} y={size} />
            </Animated.View>
          </Animated.View>
        </PanGestureHandler>
      </View>
    </View>
  );
};
