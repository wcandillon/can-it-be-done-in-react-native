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
    const { x: translateX } = this;
    return (
      <View style={styles.container}>
        <Status status="terrible" />
        <Status status="bad" />
        <Status status="ok" />
        <Status status="good" />
        <Status status="great" />
        <View style={styles.slider}>
          <Animated.View style={{ transform: [{ translateX }] }}>
            <Status status="terrible" />
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
