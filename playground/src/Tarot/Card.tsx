import React, { useEffect } from "react";
import { View, StyleSheet, Dimensions, Image } from "react-native";
import type { PanGestureHandlerGestureEvent } from "react-native-gesture-handler";
import { snapPoint } from "react-native-redash";

const { width: wWidth, height } = Dimensions.get("window");

const SNAP_POINTS = [-wWidth, 0, wWidth];
const aspectRatio = 722 / 368;
const CARD_WIDTH = wWidth - 128;
const CARD_HEIGHT = CARD_WIDTH * aspectRatio;
const IMAGE_WIDTH = CARD_WIDTH * 0.9;
const DURATION = 250;

interface CardProps {
  card: {
    source: ReturnType<typeof require>;
  };
  index: number;
}

export const Card = ({ card: { source } }: CardProps) => {
  return (
    <View style={styles.container} pointerEvents="box-none">
      <View style={[styles.card]}>
        <Image
          source={source}
          style={{
            width: IMAGE_WIDTH,
            height: IMAGE_WIDTH * aspectRatio,
          }}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
