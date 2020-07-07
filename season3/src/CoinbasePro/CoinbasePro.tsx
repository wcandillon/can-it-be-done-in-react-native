import React from "react";
import { StyleSheet, View } from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import Animated, {
  add,
  diffClamp,
  eq,
  modulo,
  sub,
} from "react-native-reanimated";
import { onGestureEvent, useValues } from "react-native-redash";

import data from "./data.json";
import Chart, { size } from "./Chart";
import Values from "./Values";
import Line from "./Line";
import Label from "./Label";
import { Candle } from "./Candle";
import Content from "./Content";
import Header from "./Header";

const candles = data.slice(0, 20);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});
const getDomain = (rows: Candle[]): [number, number] => {
  const values = rows.map(({ high, low }) => [high, low]).flat();
  return [Math.min(...values), Math.max(...values)];
};
const domain = getDomain(candles);
export default () => {
  const [x, y, state] = useValues(0, 0, State.UNDETERMINED);
  const gestureHandler = onGestureEvent({
    x,
    y,
    state,
  });
  const caliber = size / candles.length;
  const translateY = diffClamp(y, 0, size);
  const translateX = add(sub(x, modulo(x, caliber)), caliber / 2);
  const opacity = eq(state, State.ACTIVE);
  return (
    <View style={styles.container}>
      <View>
        <Header />
        <Animated.View style={{ opacity }} pointerEvents="none">
          <Values {...{ candles, translateX, caliber }} />
        </Animated.View>
      </View>
      <View>
        <Chart {...{ candles, domain }} />
        <PanGestureHandler minDist={0} {...gestureHandler}>
          <Animated.View style={StyleSheet.absoluteFill}>
            <Animated.View
              style={{
                transform: [{ translateY }],
                opacity,
                ...StyleSheet.absoluteFillObject,
              }}
            >
              <Line x={size} y={0} />
            </Animated.View>
            <Animated.View
              style={{
                transform: [{ translateX }],
                opacity,
                ...StyleSheet.absoluteFillObject,
              }}
            >
              <Line x={0} y={size} />
            </Animated.View>
            <Label y={translateY} {...{ size, domain, opacity }} />
          </Animated.View>
        </PanGestureHandler>
      </View>
      <Content />
    </View>
  );
};
