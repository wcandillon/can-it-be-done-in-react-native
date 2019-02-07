import React from "react";
import { StyleSheet, Dimensions, View } from "react-native";
import { DangerZone } from "expo";

import { Face } from "./components";

const { Animated } = DangerZone;
const {
  Value, event, divide, multiply, sub,
} = Animated;
const { width } = Dimensions.get("window");
const smileyWidth = width / 5;

// eslint-disable-next-line react/prefer-stateless-function
export default class App extends React.Component {
  x = new Value(0);

  onScroll = event(
    [
      {
        nativeEvent: {
          contentOffset: { x: this.x },
        },
      },
    ]
  )

  render() {
    const { onScroll, x } = this;
    const happiness = sub(1, divide(x, width - smileyWidth));
    const translateX = multiply(x, -1);
    return (
      <View style={styles.root}>
        <View style={styles.container}>
          <Face happiness={new Value(0)} slider={happiness} />
          <Face happiness={new Value(0.25)} slider={happiness} />
          <Face happiness={new Value(0.5)} slider={happiness} />
          <Face happiness={new Value(0.75)} slider={happiness} />
          <Face happiness={new Value(1)} slider={happiness} />
        </View>
        <Animated.View
          style={[styles.slider, { transform: [{ translateX }] }]}
        >
          <Face {...{ happiness }} />
        </Animated.View>
        <Animated.ScrollView
          style={StyleSheet.absoluteFill}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={1}
          bounces={false}
          contentContainerStyle={{ width: width * 2 - smileyWidth }}
          horizontal
          snapToInterval={smileyWidth}
          decelerationRate="fast"
          {...{ onScroll }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  slider: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "flex-end",
  },
});
