import React, { useCallback, useState } from "react";
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
  const chess = useConst(() => new Chess());
  const [board, setBoard] = useState(chess.board());
  const onTurn = useCallback(() => setBoard(chess.board), [chess]);
  return (
    <View style={styles.container}>
      <Background />
      {board.map((row, y) =>
        row.map((piece, x) => {
          if (piece !== null) {
            return (
              <Piece
                key={`${x}-${y}`}
                id={`${piece.color}${piece.type}`}
                startPosition={{ x, y }}
                chess={chess}
                onTurn={onTurn}
              />
            );
          }
          return null;
        })
      )}
    </View>
  );
};

export default Board;
