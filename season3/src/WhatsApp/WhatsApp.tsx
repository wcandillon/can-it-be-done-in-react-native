import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, { cond, eq } from "react-native-reanimated";
import { useValues, useVector } from "react-native-redash";
import ImageViewer from "./ImageViewer";

export const assets = [
  require("./assets/3.jpg"),
  require("./assets/2.jpg"),
  require("./assets/4.jpg"),
  require("./assets/5.jpg"),
  require("./assets/1.jpg"),
];

const { width, height } = Dimensions.get("window");
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
  const [currentIndex, scale, translateX] = useValues(0, 1, 0);
  const translate = useVector(0);
  return (
    <ImageViewer {...{ scale, translate, translateX }}>
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
