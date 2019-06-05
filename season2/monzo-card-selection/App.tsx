/* eslint-disable global-require */
import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, { Easing } from "react-native-reanimated";
import { Asset } from "expo-asset";
import { AppLoading } from "expo";
import { runTiming } from "react-native-redash";

import Card from "./components/Card";

const { Value, Clock, block, set, cond, clockRunning, eq } = Animated;

const cards = [
  {
    id: "summer-sunset",
    name: "Summer Sunset",
    design: require("./assets/cards/summer-sunset.png"),
    zIndex: new Value(1)
  },
  {
    id: "meteor-shower",
    name: "Meteor shower",
    design: require("./assets/cards/meteor-shower.png"),
    zIndex: new Value(2)
  },
  {
    id: "purple-sky",
    name: "Purple Sky",
    design: require("./assets/cards/purple-sky.png"),
    zIndex: new Value(3)
  }
];

export default () => {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    (async () => {
      await Promise.all(cards.map(card => Asset.loadAsync(card.design)));
      setReady(true);
    })();
  });
  if (!ready) {
    return <AppLoading />;
  }
  const clock = new Clock();
  return (
    <View style={styles.container}>
      <Animated.Code>
        {() =>
          block([
            runTiming(clock, 0, {
              toValue: 1,
              duration: 5000,
              easing: Easing.linear
            }),
            cond(eq(clockRunning(clock), 0), set(cards[1].zIndex, 4))
          ])
        }
      </Animated.Code>
      {cards.map((card, index) => {
        return (
          <Animated.View
            key={card.id}
            style={{
              zIndex: card.zIndex,
              elevation: card.zIndex,
              ...StyleSheet.absoluteFillObject,
              transform: [{ rotateZ: `${index * 5}deg` }]
            }}
          >
            <Card {...{ card }} />
          </Animated.View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
