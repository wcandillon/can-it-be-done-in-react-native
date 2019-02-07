import * as React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { DangerZone } from "expo";

const {
  Animated,
} = DangerZone;
const {
  Value, Extrapolate, event, interpolate, concat,
} = Animated;
const { height } = Dimensions.get("window");

interface StoriesProps {}

export default class Stories extends React.PureComponent<StoriesProps> {
  y = new Value(0);

  onScroll = event(
    [
      {
        nativeEvent: {
          contentOffset: { y: this.y },
        },
      },
    ],
  )

  render() {
    const { y, onScroll } = this;
    const translateY = interpolate(y, {
      inputRange: [0, height],
      outputRange: [0, height / 2],
      extrapolate: Extrapolate.CLAMP,
    });
    const rotateX = concat(interpolate(y, {
      inputRange: [0, height],
      outputRange: [0, 180],
      extrapolate: Extrapolate.CLAMP,
    }), "deg");
    return (
      <View style={styles.container}>
        <View style={styles.story}>
          <Animated.View style={[styles.topHalf, { transform: [{ rotateX }] }]} />
          <View style={styles.bottomHalf} />
        </View>
        <Animated.ScrollView
          style={{ ...StyleSheet.absoluteFillObject }}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={1}
          bounces={false}
          contentContainerStyle={{ height: height * 2 }}

          decelerationRate="fast"
          {...{ onScroll }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  story: {
    flex: 1,
  },
  bottomHalf: {
    flex: 1,
    backgroundColor: "blue",
  },
  topHalf: {
    flex: 1,
    backgroundColor: "red",
    // backfaceVisibility: "hidden",
  },
});
