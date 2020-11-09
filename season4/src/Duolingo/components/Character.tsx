import React from "react";
import { StyleSheet } from "react-native";
import Svg, { Image } from "react-native-svg";

const CHARACTER_WIDTH = 150;
const CHARACTER_ASPECT_RATIO = 560 / 449.75;
const styles = StyleSheet.create({
  image: {
    width: CHARACTER_WIDTH,
    height: CHARACTER_WIDTH * CHARACTER_ASPECT_RATIO,
  },
});

const Character = () => {
  return (
    <Svg style={styles.image}>
      <Image
        width="100%"
        height="100%"
        href={require("../assets/character.png")}
      />
    </Svg>
  );
};

export default Character;
