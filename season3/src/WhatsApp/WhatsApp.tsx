import React, { useRef } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, { Value, sub } from "react-native-reanimated";
import {
  usePanGestureHandler,
  usePinchGestureHandler,
  useValue,
  vec,
} from "react-native-redash";
import {
  PanGestureHandler,
  PinchGestureHandler,
} from "react-native-gesture-handler";
import { CANVAS, usePinch } from "./AnimationUtil";

const { width, height } = Dimensions.get("window");
export const assets = [
  require("./assets/3.jpg"),
  require("./assets/2.jpg"),
  require("./assets/4.jpg"),
  require("./assets/5.jpg"),
  require("./assets/1.jpg"),
];

const translationsX = assets.map(() => new Value(0));
const translationsY = assets.map(() => new Value(0));
const scales = assets.map(() => new Value(1));
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
  const pinchRef = useRef<PinchGestureHandler>(null);
  const panRef = useRef<PanGestureHandler>(null);

  const pan = usePanGestureHandler();
  const pinch = usePinchGestureHandler();

  const index = useValue(0);
  const translateX = new Value(0); // get(translationsX, index) as Animated.Value<number>;
  const translateY = new Value(0); // get(translationsX, index) as Animated.Value<number>;
  const scale = new Value(1); // get(scales, index) as Animated.Value<number>;

  const minVec = vec.min(vec.multiply(-0.5, CANVAS, sub(scale, 1)), 0);
  const maxVec = vec.max(vec.minus(minVec), 0);

  usePinch({ pinch, translateX, translateY, scale });
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
                        transform: [{ translateX }, { translateY }, { scale }],
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
