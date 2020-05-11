import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, {
  add,
  and,
  cond,
  debug,
  divide,
  eq,
  floor,
  greaterThan,
  lessThan,
  max,
  min,
  multiply,
  not,
  round,
  set,
  sub,
  useCode,
} from "react-native-reanimated";
import {
  addTo,
  minus,
  subTo,
  timing,
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
  picture: {
    width,
    height,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
  },
});

const WhatsApp = () => {
  const currentIndex = useValue(0);
  const currentIndexCont = withTransition(currentIndex);
  const snapped = useValue(1);
  const scale = useValue(1);
  const panState = useValue(State.END);
  const translate = useVector(0);
  const minX = min(multiply(-0.5, width, sub(scale, 1)), 0);
  const maxX = max(minus(minX), 0);
  const left = sub(translate.x, maxX);
  const right = sub(translate.x, minX);
  const translateX = add(
    multiply(currentIndexCont, -width),
    cond(greaterThan(left, 0), left, cond(lessThan(right, 0), right, 0))
  );
  useCode(
    () => [
      cond(eq(panState, State.ACTIVE), [set(snapped, 0)]),
      cond(and(eq(panState, State.END), not(snapped)), [
        cond(greaterThan(left, 0), [subTo(currentIndex, 1), set(scale, 1)]),
        cond(lessThan(right, 0), [addTo(currentIndex, 1), set(scale, 1)]),
        set(snapped, 1),
        debug("currentIndex", currentIndex),
      ]),
    ],
    [currentIndex, left, panState, right, scale, snapped]
  );
  return (
    <ImageViewer {...{ scale, translate, panState }}>
      <Animated.View
        style={{
          height,
          width: width * assets.length,
          flexDirection: "row",
          transform: [{ translateX }],
        }}
      >
        {assets.map((asset, index) => {
          const isActive = eq(currentIndex, index);
          return (
            <View key={asset} style={styles.picture}>
              <Animated.Image
                source={asset}
                style={[
                  styles.image,
                  {
                    transform: [
                      { translateX: cond(isActive, translate.x, 0) },
                      { translateY: cond(isActive, translate.y, 0) },
                      { scale: cond(isActive, scale, 1) },
                    ],
                  },
                ]}
              />
            </View>
          );
        })}
      </Animated.View>
    </ImageViewer>
  );
};

export default WhatsApp;
