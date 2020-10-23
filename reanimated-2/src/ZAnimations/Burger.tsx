import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { useSharedValue } from "react-native-reanimated";

import ZBox from "./components/ZBox";
import ZSvg from "./components/ZSvg";

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

const canvas = {
  x: width,
  y: width,
  z: width,
};

const Arc = () => {
  return (
    <View style={styles.container}>
      <ZSvg canvas={canvas}>
        <ZBox
          width={0.6}
          height={0.5}
          depth={0.4}
          front="#FFC27A"
          back="#7EDAB9"
          left="#45A6E5"
          right="#FE8777"
          top="#B97EDA"
          bottom="#DA7E9F"
        />
      </ZSvg>
    </View>
  );
};

export default Arc;
