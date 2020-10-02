import React from "react";
import { StyleSheet, View } from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { snapPoint } from "react-native-redash";

import Item, { MAX_HEIGHT } from "./Item";

const items = [
  {
    title: "Upcoming Show Live from Paris",
    subtitle: "SPRING-SUMMER 2021",
    picture: require("./assets/laura-chouette-NFrPPyGe5q0-unsplash.jpg"),
  },
  {
    title: "In Boutiques",
    subtitle: "FALL-WINTER 2020/21",
    picture: require("./assets/sonnie-hiles-pU4J5VFnqCQ-unsplash.jpg"),
  },
  {
    title: "46th Edtion of the Deauville American Film Festival",
    subtitle: "CHANEL IN CINEMA",
    picture: require("./assets/fezbot2000-vScxe3Ue5oE-unsplash.jpg"),
  },
  {
    title: "IN BOUTIQUES",
    subtitle: "Métiers d'art 2019/20",
    picture: require("./assets/judeus-samson-y2ny77b5sU0-unsplash.jpg"),
  },
  {
    title: "Haute Couture",
    subtitle: "FALL-WINTER 2020/21",
    picture: require("./assets/khaled-ghareeb-upepKTbwm3A-unsplash.jpg"),
  },
  {
    title: "Balade en Méditerranée",
    subtitle: "CRUISE 2020/21",
    picture: require("./assets/christopher-campbell-A3QXXEfcA1U-unsplash.jpg"),
  },
  {
    title: "Spring-Summer 2020 Campaign",
    subtitle: "EYEWEAR",
    picture: require("./assets/chase-fade-Pb13EUxzMDw-unsplash.jpg"),
  },
];

const styles = StyleSheet.create({
  container: { flex: 1 },
});

const Channel = () => {
  const y = useSharedValue(0);
  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { offsetY: number }
  >({
    onStart: (event, ctx) => {
      ctx.offsetY = y.value;
    },
    onActive: (event, ctx) => {
      y.value = ctx.offsetY + event.translationY;
    },
    onEnd: ({ velocityY }, ctx) => {
      const to = snapPoint(
        y.value,
        velocityY,
        items.map((_, i) => -i * MAX_HEIGHT)
      );
      y.value = withSpring(to);
    },
  });
  return (
    <View style={styles.container}>
      {items.map((item, index) => (
        <Item item={item} key={index} y={y} index={index} />
      ))}
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={StyleSheet.absoluteFill} />
      </PanGestureHandler>
    </View>
  );
};

export default Channel;
