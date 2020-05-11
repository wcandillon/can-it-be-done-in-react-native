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
  onChange,
  round,
  set,
  sub,
  useCode,
} from "react-native-reanimated";
import {
  addTo,
  clamp,
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
import { State } from "react-native-gesture-handler";
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
  const clock = useClock();
  const index = useValue(0);
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
  const offset = multiply(index, -width);
  const minX = min(multiply(-0.5, width, sub(scale, 1)), 0);
  const maxX = max(minus(minX), 0);
  const { x } = translation;
  const left = sub(x, clamp(x, minX, maxX));
  const snapTo = snapPoint(
    translateX,
    velocity.x,
    assets.map((_, i) => -width * i)
  );
  const newIndex = floor(divide(translateX, -width));
  useCode(
    () => [
      cond(eq(state, State.ACTIVE), [set(translateX, add(offset, left))]),
      cond(eq(state, State.END), [
        set(translateX, timing({ clock, from: translateX, to: snapTo })),
        cond(and(not(clockRunning(clock)), neq(index, newIndex)), [
          // set(scale, 1),
          // vec.set(translation, 0),
          set(index, newIndex),
          set(state, State.UNDETERMINED),
        ]),
      ]),
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  return (
    <ImageViewer
      pan={translation}
      panState={state}
      panGestureHandler={gestureHandler}
      {...{ scale, translate, index }}
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
          {assets.map((asset, i) => {
            const active = eq(i, index);
            return (
              <View key={asset} style={styles.picture}>
                <Animated.Image
                  source={asset}
                  style={[
                    styles.image,
                    {
                      transform: [
                        {
                          translateX: cond(active, translate.x),
                        },
                        { translateY: cond(active, translate.y, 0) },
                        { scale: cond(active, scale, 1) },
                      ],
                    },
                  ]}
                />
              </View>
            );
          })}
        </Animated.View>
      </Animated.View>
    </ImageViewer>
  );
};

export default WhatsApp;
