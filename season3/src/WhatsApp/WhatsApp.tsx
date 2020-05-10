import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, {
  cond,
  eq,
  lessThan,
  min,
  multiply,
  sub,
  useCode,
} from "react-native-reanimated";
import { useValues, useVector, useVectors, vec } from "react-native-redash";
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
  const [currentIndex, scale, panState] = useValues(0, 1, 0, State.END);
  const [translate] = useVectors([0]);
  const minX = min(multiply(-0.5, width, sub(scale, 1)), 0);
  const right = sub(translate.x, minX);
  const translateX = cond(lessThan(right, 0), right, 0);
  /*
    const minVec = vec.min(vec.multiply(-0.5, CANVAS, sub(scale, 1)), 0);
  const maxVec = vec.max(vec.minus(minVec), 0);
  */
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
