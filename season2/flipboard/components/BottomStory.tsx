import * as React from "react";
import {
  View, StyleSheet, Dimensions, Image,
} from "react-native";
import { DangerZone } from "expo";

import Interactable from "./Interactable";

const {
  Animated,
} = DangerZone;
const {
  Value, Extrapolate, interpolate, concat,
} = Animated;
const { height } = Dimensions.get("window");
const frontPerspective = 1000;
const backPerspective = -frontPerspective;

interface StoriesProps {
  front: string;
  back: string;
}

export default class Story extends React.PureComponent<StoriesProps> {
  y = new Value(0);

  render() {
    const { y } = this;
    const { front, back } = this.props;
    const interpolation = interpolate(y, {
      inputRange: [-height, 0],
      outputRange: [180, 0],
      extrapolate: Extrapolate.CLAMP,
    });
    const rotateX = concat(interpolation, "deg");
    const snapPoints = [{ y: -height }, { y: 0 }];
    return (
      <View style={styles.container}>
        <View style={styles.story}>
          <Animated.View
            style={{
              ...StyleSheet.absoluteFillObject,
              transform: [backPerspective, { rotateY: "180deg" }, { translateY: -height / 4 }, { rotateX }, { translateY: height / 4 }, { rotateZ: "180deg" }],
            }}
          >
            <Image source={{ uri: back }} style={styles.image} />
          </Animated.View>
          <Animated.View
            style={{
              ...StyleSheet.absoluteFillObject,
              backfaceVisibility: "hidden",
              transform: [frontPerspective, { translateY: -height / 4 }, { rotateX }, { translateY: height / 4 }],
            }}
          >
            <Image source={{ uri: front }} style={styles.image} />
          </Animated.View>
        </View>
        <Interactable
          style={{
            backgroundColor: "rgba(100, 200, 300, 0.5)", height, position: "absolute", top: 0, left: 0, right: 0,
          }}
          animatedValueY={y}
          verticalOnly
          {...{ snapPoints }}
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
