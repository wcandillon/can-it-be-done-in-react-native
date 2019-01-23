import React from "react";
import {
  StyleSheet, View, Dimensions,
} from "react-native";
import { DangerZone } from "expo";

import { Status } from "./components";

const { Animated } = DangerZone;
const { Value, event, add } = Animated;
const { width } = Dimensions.get("window");

interface AppProps {

}

// eslint-disable-next-line react/prefer-stateless-function
export default class App extends React.Component<AppProps> {
  x = new Value(0);

  onScroll = event(
    [
      {
        nativeEvent: {
          contentOffset: { x: this.x },
        },
      },
    ],
    { useNativeDriver: true },
  );

  render() {
    const { onScroll } = this;
    const { x } = this;
    const inputRange = [
      0,
      width / 5,
      width * 2 / 5,
      width * 3 / 5,
      width * 4 / 5,
    ];
    return (
      <View style={styles.container}>
        <Status x={new Value(inputRange[0])} {...{ inputRange }} />
        <Status x={new Value(inputRange[1])} {...{ inputRange }} />
        <Status x={new Value(inputRange[2])} {...{ inputRange }} />
        <Status x={new Value(inputRange[3])} {...{ inputRange }} />
        <Status x={new Value(inputRange[4])} {...{ inputRange }} />
        <View style={styles.slider}>
          <Animated.View style={{ transform: [{ translateX: x }] }}>
            <Status {...{ x, inputRange }} />
          </Animated.View>
        </View>
        <Animated.ScrollView
          style={StyleSheet.absoluteFill}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          bounces={false}
          contentContainerStyle={{ width: width * 2 - width / 5 + 2 }}
          horizontal
          inverse
          {...{ onScroll }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  slider: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: "row",
    alignItems: "center",
  },
});
