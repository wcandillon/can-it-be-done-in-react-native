import * as React from "react";
import {
  View, StyleSheet, Dimensions, Image,
} from "react-native";
import { DangerZone } from "expo";

const {
  Animated,
} = DangerZone;
const {
  Value, Extrapolate, event, interpolate, concat,
} = Animated;
const { height } = Dimensions.get("window");
const perspective = 1000;

export interface Story {
  top: string;
  bottom: string;
}

interface StoriesProps {
  stories: Story[];
}

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
    const { stories } = this.props;
    const story = stories[0];
    const { top } = story;
    const rotateX = concat(interpolate(y, {
      inputRange: [0, height],
      outputRange: [0, -180],
      extrapolate: Extrapolate.CLAMP,
    }), "deg");
    return (
      <View style={styles.container}>
        <View style={styles.story}>
          <Animated.View
            style={[styles.topHalf, {
              transform: [{ perspective }, { translateY: height / 4 }, { rotateX }, { translateY: -height / 4 }],
            }]}
          >
            <Image source={{ uri: top }} style={styles.image} />
          </Animated.View>
          <View style={styles.bottomHalf} />
        </View>
        <Animated.ScrollView
          style={styles.scrollView}
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
  scrollView: {
    ...StyleSheet.absoluteFillObject,
  },
  bottomHalf: {
    flex: 1,
    backgroundColor: "transparent",
  },
  topHalf: {
    flex: 1,
    // backfaceVisibility: "hidden",
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: null,
    height: null,
    resizeMode: "cover",
  },
});
