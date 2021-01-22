import { Chess } from "chess.js";
import React, { useCallback } from "react";
import { StyleSheet, Image } from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Vector } from "react-native-redash";

import { fromPosition, SIZE, toPosition } from "./Engine";

const styles = StyleSheet.create({
  piece: {
    width: SIZE,
    height: SIZE,
  },
});
export const PIECES = {
  br: require("./assets/br.png"),
  bp: require("./assets/bp.png"),
  bn: require("./assets/bn.png"),
  bb: require("./assets/bb.png"),
  bq: require("./assets/bq.png"),
  bk: require("./assets/bk.png"),
  wr: require("./assets/wr.png"),
  wn: require("./assets/wn.png"),
  wb: require("./assets/wb.png"),
  wq: require("./assets/wq.png"),
  wk: require("./assets/wk.png"),
  wp: require("./assets/wp.png"),
};

interface PieceProps {
  id: keyof typeof PIECES;
  startPosition: Vector;
  client: Chess;
}

const Piece = ({ id, startPosition, client }: PieceProps) => {
  const from = useSharedValue(
    fromPosition({ x: startPosition.x * SIZE, y: startPosition.y * SIZE })
  );
  const translateX = useSharedValue(startPosition.x * SIZE);
  const translateY = useSharedValue(startPosition.y * SIZE);
  const movePiece = useCallback(
    (to: string) => {
      const move = client
        .moves({ verbose: true })
        .find((m) => m.from === from.value && m.to === to);
      console.log({ to: move ? move.to : from.value });
      const { x, y } = toPosition(move ? move.to : from.value);
      translateX.value = withTiming(x);
      translateY.value = withTiming(y);
    },
    [client, from.value, translateX, translateY]
  );
  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { x: number; y: number }
  >({
    onStart: (_, ctx) => {
      ctx.x = translateX.value;
      ctx.y = translateY.value;
    },
    onActive: ({ translationX, translationY }, { x, y }) => {
      translateX.value = x + translationX;
      translateY.value = y + translationY;
    },
    onEnd: () => {
      runOnJS(movePiece)(
        fromPosition({ x: translateX.value, y: translateY.value })
      );
    },
  });
  const style = useAnimatedStyle(() => ({
    position: "absolute",
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));
  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View style={style}>
        <Image source={PIECES[id]} style={styles.piece} />
      </Animated.View>
    </PanGestureHandler>
  );
};

export default Piece;
