import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { useSharedValue } from "react-native-reanimated";

import Background from "./Background";
import {Player} from "./Engine";
import Piece from "./Piece";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    width,
    height: width,
  },
});

const Board = () => {
  const status = useSharedValue({ player: Player.WHITE });
  return (
    <View style={styles.container}>
      <Background />
      <Piece id="br" startPosition={{ x: 0, y: 0 }} />
      <Piece id="br" startPosition={{ x: 7, y: 0 }} />
      <Piece id="bn" startPosition={{ x: 1, y: 0 }} />
      <Piece id="bn" startPosition={{ x: 6, y: 0 }} />
      <Piece id="bb" startPosition={{ x: 5, y: 0 }} />
      <Piece id="bb" startPosition={{ x: 2, y: 0 }} />
      <Piece id="bq" startPosition={{ x: 3, y: 0 }} />
      <Piece id="bk" startPosition={{ x: 4, y: 0 }} />
      <Piece id="bp" startPosition={{ x: 0, y: 1 }} />
      <Piece id="bp" startPosition={{ x: 1, y: 1 }} />
      <Piece id="bp" startPosition={{ x: 2, y: 1 }} />
      <Piece id="bp" startPosition={{ x: 3, y: 1 }} />
      <Piece id="bp" startPosition={{ x: 4, y: 1 }} />
      <Piece id="bp" startPosition={{ x: 5, y: 1 }} />
      <Piece id="bp" startPosition={{ x: 6, y: 1 }} />
      <Piece id="bp" startPosition={{ x: 7, y: 1 }} />
      <Piece id="wr" startPosition={{ x: 0, y: 7 }} />
      <Piece id="wr" startPosition={{ x: 7, y: 7 }} />
      <Piece id="wn" startPosition={{ x: 1, y: 7 }} />
      <Piece id="wn" startPosition={{ x: 6, y: 7 }} />
      <Piece id="wb" startPosition={{ x: 5, y: 7 }} />
      <Piece id="wb" startPosition={{ x: 2, y: 7 }} />
      <Piece id="wq" startPosition={{ x: 3, y: 7 }} />
      <Piece id="wk" startPosition={{ x: 4, y: 7 }} />
      <Piece id="wp" startPosition={{ x: 0, y: 6 }} />
      <Piece id="wp" startPosition={{ x: 1, y: 6 }} />
      <Piece id="wp" startPosition={{ x: 2, y: 6 }} />
      <Piece id="wp" startPosition={{ x: 3, y: 6 }} />
      <Piece id="wp" startPosition={{ x: 4, y: 6 }} />
      <Piece id="wp" startPosition={{ x: 5, y: 6 }} />
      <Piece id="wp" startPosition={{ x: 6, y: 6 }} />
      <Piece id="wp" startPosition={{ x: 7, y: 6 }} />
    </View>
  );
};

export default Board;
