import React from "react";
import { StyleSheet, View } from "react-native";

import { Button } from "../components";

import Pixel, { HEIGHT, WIDTH } from "./Pixel";
import { UP, DOWN, LEFT, RIGHT, useSnake } from "./Snake";

const styles = StyleSheet.create({
  phone: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  screen: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
});
const Nokia = () => {
  const snake = useSnake(WIDTH, HEIGHT);
  return (
    <View style={styles.phone}>
      <View style={styles.screen}>
        {new Array(HEIGHT).fill(0).map((_0, y) =>
          new Array(WIDTH).fill(0).map((_1, x) => {
            return <Pixel key={`${x}-${y}`} x={x} y={y} snake={snake} />;
          })
        )}
      </View>
      <Button
        label="UP"
        onPress={() => {
          snake.value = {
            ...snake.value,
            direction: UP,
          };
        }}
      />
      <Button
        label="LEFT"
        onPress={() => {
          snake.value = {
            ...snake.value,
            direction: LEFT,
          };
        }}
      />
      <Button
        label="RIGHT"
        onPress={() => {
          snake.value = {
            ...snake.value,
            direction: RIGHT,
          };
        }}
      />
      <Button
        label="DOWN"
        onPress={() => {
          snake.value = {
            ...snake.value,
            direction: DOWN,
          };
        }}
      />
    </View>
  );
};

export default Nokia;
