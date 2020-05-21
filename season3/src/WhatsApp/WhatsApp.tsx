import React, { useRef, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, { Value, cond, eq, sub } from "react-native-reanimated";
import {
  translate as translateVector,
  usePanGestureHandler,
  usePinchGestureHandler,
  useValue,
  vec,
} from "react-native-redash";
import {
  PanGestureHandler,
  PinchGestureHandler,
} from "react-native-gesture-handler";
import { CANVAS, usePinch, useSwipe } from "./AnimationUtil";

const { width, height } = Dimensions.get("window");
export const assets = [
  require("./assets/3.jpg"),
  require("./assets/2.jpg"),
  require("./assets/4.jpg"),
  require("./assets/5.jpg"),
  require("./assets/1.jpg"),
];

const values = assets.map(() => ({
  scale: new Value(1),
  translate: vec.createValue(0, 0),
}));
const snapPoints = assets.map((_, i) => -width * i);

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "black",
  },
  pictures: {
    flexDirection: "row",
    height,
    width: width * assets.length,
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
    resizeMode: "cover",
  },
});

const WhatsApp = () => {
  const [index, setIndex] = useState(0);

  const pinchRef = useRef<PinchGestureHandler>(null);
  const panRef = useRef<PanGestureHandler>(null);

  const pan = usePanGestureHandler();
  const pinch = usePinchGestureHandler();

  const { scale, translate } = values[index];

  const minVec = vec.min(vec.multiply(-0.5, CANVAS, sub(scale, 1)), 0);
  const maxVec = vec.max(vec.minus(minVec), 0);
  usePinch({ pan, pinch, translate, scale, minVec, maxVec });
  return (
    <PinchGestureHandler
      ref={pinchRef}
      simultaneousHandlers={panRef}
      {...pinch.gestureHandler}
    >
      <Animated.View style={StyleSheet.absoluteFill}>
        <PanGestureHandler
          ref={panRef}
          minDist={10}
          avgTouches
          simultaneousHandlers={pinchRef}
          {...pan.gestureHandler}
        >
          <Animated.View style={styles.container}>
            <Animated.View
              style={[styles.pictures, { transform: [{ translateX: 0 }] }]}
            >
              {assets.map((source, i) => (
                <View key={i} style={styles.picture}>
                  <Animated.Image
                    style={[
                      styles.image,
                      {
                        transform: [...translateVector(translate), { scale }],
                      },
                    ]}
                    {...{ source }}
                  />
                </View>
              ))}
            </Animated.View>
          </Animated.View>
        </PanGestureHandler>
      </Animated.View>
    </PinchGestureHandler>
  );
};

export default WhatsApp;
