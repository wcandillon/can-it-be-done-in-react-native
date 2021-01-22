import React from 'react';
import { Dimensions, StyleSheet, Image } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { Vector } from 'react-native-redash';

const {width} = Dimensions.get("window");
const SIZE = width / 8;
const styles = StyleSheet.create({
  piece: {
    width: SIZE,
    height: SIZE 
  }
});
export const PIECES = {
  "br": require("./assets/br.png"),
  "bp": require("./assets/bp.png"),
  "bn": require("./assets/bn.png"),
  "bb": require("./assets/bb.png"),
  "bq": require("./assets/bq.png"),
  "bk": require("./assets/bk.png"),
  "wr": require("./assets/wr.png"),
  "wn": require("./assets/wn.png"),
  "wb": require("./assets/wb.png"),
  "wq": require("./assets/wq.png"),
  "wk": require("./assets/wk.png"),
  "wp": require("./assets/wp.png"),
}

interface PieceProps {
  id: keyof typeof PIECES;
  startPosition: Vector;
}

const Piece = ({ id, startPosition }: PieceProps) => {
  const translateX = useSharedValue(startPosition.x * SIZE);
  const translateY = useSharedValue(startPosition.y * SIZE);
  const style = useAnimatedStyle(() => ({
    position: "absolute",
    transform: [
      { translateX: translateX.value},
      { translateY: translateY.value}
    ]
  }));
  return (
      <Animated.View style={style}>
        <Image source={PIECES[id]} style={styles.piece} />
      </Animated.View>
  );
}

export default Piece;
