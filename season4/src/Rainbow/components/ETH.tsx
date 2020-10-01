/* eslint-disable max-len */
import * as React from "react";
import { StyleSheet, View } from "react-native";
import Svg, { G, Path } from "react-native-svg";

const SIZE = 50;
const aspectRatio = 417 / 256;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    justifyContent: "center",
    alignItems: "center",
  },
});

const ETH = () => {
  return (
    <View style={styles.container}>
      <Svg
        width={SIZE - 32}
        height={(SIZE - 32) * aspectRatio}
        viewBox="0 0 256 417"
      >
        <G fill="#FFF" fillRule="evenodd">
          <Path d="M127.961 0l-2.795 9.5v275.668l2.795 2.79 127.962-75.638z" />
          <Path d="M127.962 0L0 212.32l127.962 75.639V154.158zM127.961 312.187l-1.575 1.92v98.199l1.575 4.6L256 236.587z" />
          <Path d="M127.962 416.905v-104.72L0 236.585z" />
        </G>
      </Svg>
    </View>
  );
};

export default ETH;
