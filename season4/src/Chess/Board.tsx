import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Chess } from "chess.js";

import { useConst } from "../components/AnimatedHelpers";

import Background from "./Background";
import Piece from "./Piece";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    width,
    height: width,
  },
});

const Board = () => {
  const client = useConst(() => new Chess());
  console.log(client.moves({ verbose: true }));
  return (
    <View style={styles.container}>
      <Background />
      <Piece id="br" startPosition={{ x: 0, y: 0 }} client={client} />
      <Piece id="br" startPosition={{ x: 7, y: 0 }} client={client} />
      <Piece id="bn" startPosition={{ x: 1, y: 0 }} client={client} />
      <Piece id="bn" startPosition={{ x: 6, y: 0 }} client={client} />
      <Piece id="bb" startPosition={{ x: 5, y: 0 }} client={client} />
      <Piece id="bb" startPosition={{ x: 2, y: 0 }} client={client} />
      <Piece id="bq" startPosition={{ x: 3, y: 0 }} client={client} />
      <Piece id="bk" startPosition={{ x: 4, y: 0 }} client={client} />
      <Piece id="bp" startPosition={{ x: 0, y: 1 }} client={client} />
      <Piece id="bp" startPosition={{ x: 1, y: 1 }} client={client} />
      <Piece id="bp" startPosition={{ x: 2, y: 1 }} client={client} />
      <Piece id="bp" startPosition={{ x: 3, y: 1 }} client={client} />
      <Piece id="bp" startPosition={{ x: 4, y: 1 }} client={client} />
      <Piece id="bp" startPosition={{ x: 5, y: 1 }} client={client} />
      <Piece id="bp" startPosition={{ x: 6, y: 1 }} client={client} />
      <Piece id="bp" startPosition={{ x: 7, y: 1 }} client={client} />
      <Piece id="wr" startPosition={{ x: 0, y: 7 }} client={client} />
      <Piece id="wr" startPosition={{ x: 7, y: 7 }} client={client} />
      <Piece id="wn" startPosition={{ x: 1, y: 7 }} client={client} />
      <Piece id="wn" startPosition={{ x: 6, y: 7 }} client={client} />
      <Piece id="wb" startPosition={{ x: 5, y: 7 }} client={client} />
      <Piece id="wb" startPosition={{ x: 2, y: 7 }} client={client} />
      <Piece id="wq" startPosition={{ x: 3, y: 7 }} client={client} />
      <Piece id="wk" startPosition={{ x: 4, y: 7 }} client={client} />
      <Piece id="wp" startPosition={{ x: 0, y: 6 }} client={client} />
      <Piece id="wp" startPosition={{ x: 1, y: 6 }} client={client} />
      <Piece id="wp" startPosition={{ x: 2, y: 6 }} client={client} />
      <Piece id="wp" startPosition={{ x: 3, y: 6 }} client={client} />
      <Piece id="wp" startPosition={{ x: 4, y: 6 }} client={client} />
      <Piece id="wp" startPosition={{ x: 5, y: 6 }} client={client} />
      <Piece id="wp" startPosition={{ x: 6, y: 6 }} client={client} />
      <Piece id="wp" startPosition={{ x: 7, y: 6 }} client={client} />
    </View>
  );
};

export default Board;
