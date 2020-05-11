import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, {
  add,
  and,
  clockRunning,
  cond,
  debug,
  diff,
  divide,
  eq,
  floor,
  greaterThan,
  lessThan,
  max,
  min,
  multiply,
  neq,
  not,
  round,
  set,
  sub,
  useCode,
} from "react-native-reanimated";
import {
  addTo,
  dec,
  inc,
  minus,
  snapPoint,
  subTo,
  timing,
  useClock,
  usePanGestureHandler,
  useValue,
  useValues,
  useVector,
  useVectors,
  vec,
  withTransition,
} from "react-native-redash";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import ImageViewer, { CANVAS } from "./ImageViewer";

const { x: width, y: height } = CANVAS;
export const assets = [
  require("./assets/3.jpg"),
  require("./assets/2.jpg"),
  require("./assets/4.jpg"),
  require("./assets/5.jpg"),
  require("./assets/1.jpg"),
];

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "black",
  },
  picture: {
    width,
    height,
    overflow: "hidden",
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
  },
});

const WhatsApp = () => {
  const offsetX = useValue(0);
  const translateX = useValue(0);
  const scale = useValue(1);
  const translate = useVector(0);
  const {
    gestureHandler,
    translation,
    velocity,
    state,
  } = usePanGestureHandler();
  const snapTo = snapPoint(
    translateX,
    velocity.x,
    assets.map((_, i) => -width * i)
  );
  useCode(
    () => [
      cond(eq(state, State.ACTIVE), [
        set(translateX, add(offsetX, translation.x)),
      ]),
      cond(eq(state, State.END), [
        set(translateX, timing({ from: translateX, to: snapTo })),
        set(offsetX, translateX),
      ]),
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  return (
    <ImageViewer
      panState={state}
      panGestureHandler={gestureHandler}
      {...{ scale, translate }}
    >
      <Animated.View style={styles.container}>
        <Animated.View
          style={{
            height,
            width: width * assets.length,
            flexDirection: "row",
            transform: [{ translateX }],
          }}
        >
          {assets.map((asset, index) => {
            return (
              <View key={asset} style={styles.picture}>
                <Animated.Image source={asset} style={styles.image} />
              </View>
            );
          })}
        </Animated.View>
      </Animated.View>
    </ImageViewer>
  );
};

export default WhatsApp;
