import React from "react";
import { StyleSheet } from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { clamp, snapPoint } from "react-native-redash";

import Item, { MAX_HEIGHT } from "./Item";

export const items = [
  {
    title: "Upcoming Show Live from Paris",
    subtitle: "SPRING-SUMMER 2021",
    picture: require("./assets/chanel.jpg"),
  },
  {
    title: "In Boutiques",
    subtitle: "FALL-WINTER 2020/21",
    picture: require("./assets/sonnie-hiles-pU4J5VFnqCQ-unsplash.jpg"),
  },
  {
    title: "46th Edtion of the Deauville American Film Festival",
    subtitle: "CHANEL IN CINEMA",
    picture: require("./assets/laura-chouette-NFrPPyGe5q0-unsplash.jpg"),
  },
  {
    title: "IN BOUTIQUES",
    subtitle: "Métiers d'art 2019/20",
    picture: require("./assets/butsarakham-buranaworachot-au6Gddf1pZQ-unsplash.jpg"),
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
const snapPoints = items.map((_, i) => -i * MAX_HEIGHT);
const minY = Math.min(...snapPoints);
const maxY = Math.max(...snapPoints);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});

const Channel = () => {
  const y = useSharedValue(0);
  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { offsetY: number }
  >({
    onStart: (_, ctx) => {
      ctx.offsetY = y.value;
    },
    onActive: ({ translationY }, ctx) => {
      y.value = clamp(ctx.offsetY + translationY, minY, maxY);
    },
    onEnd: ({ velocityY }) => {
      const to = snapPoint(y.value, velocityY, snapPoints);
      y.value = withTiming(to);
    },
  });
  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View style={styles.container}>
        {items.map((item, index) => (
          <Item item={item} key={index} y={y} index={index} />
        ))}
      </Animated.View>
    </PanGestureHandler>
  );
};

export default Channel;
