import React, { useState, useEffect } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useDerivedValue,
  withSpring,
} from "react-native-reanimated";
import { mix } from "react-native-redash";

import { Button, Card, StyleGuide, cards } from "../components";

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: StyleGuide.palette.background,
    justifyContent: "flex-end",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    padding: StyleGuide.spacing * 4,
  },
});
const origin = { x: -(width / 2 - StyleGuide.spacing * 2), y: 0 };

const useSpringTransition = (state: boolean | number) => {
  const value = useSharedValue(0);
  useEffect(() => {
    // eslint-disable-next-line no-nested-ternary
    value.value = typeof state === "boolean" ? (state ? 1 : 0) : state;
  }, [state, value]);
  const transition = useDerivedValue(() => {
    return withSpring(value.value);
  });
  return transition;
};

const UseTransition = () => {
  const [toggled, setToggle] = useState(false);
  const transition = useSpringTransition(toggled);
  return (
    <View style={styles.container}>
      {cards.slice(0, 3).map((card, index) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const style = useAnimatedStyle(() => {
          const rotate = (index - 1) * mix(transition.value, 0, Math.PI / 6);
          return {
            transform: [
              { translateX: origin.x },
              { rotate: `${rotate}rad` },
              { translateX: -origin.x },
            ],
          };
        });
        return (
          <Animated.View key={card} style={[styles.overlay, style]}>
            <Card {...{ card }} />
          </Animated.View>
        );
      })}
      <Button
        label={toggled ? "Reset" : "Start"}
        onPress={() => setToggle((prev) => !prev)}
        primary
      />
    </View>
  );
};

export default UseTransition;
