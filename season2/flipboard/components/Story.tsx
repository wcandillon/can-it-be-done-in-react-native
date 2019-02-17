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
  Value, Extrapolate, event, interpolate, concat, call,
} = Animated;
const { height } = Dimensions.get("window");
const frontP = 1000;
const backP = -frontP;

export interface IStory {
  top: string;
  bottom: string;
}

interface StoriesProps {
  front: IStory;
  back: IStory;
}

export default class Story extends React.PureComponent<StoriesProps> {
  scroll: React.RefObject<typeof Animated.ScrollView> = React.createRef();

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
    const {
      front: { top: topFront, bottom: bottomFront },
      back: { top: topBack, bottom: bottomBack },
    } = this.props;
    const rotateX = concat(interpolate(y, {
      inputRange: [0, height],
      outputRange: [0, -180],
      extrapolate: Extrapolate.CLAMP,
    }), "deg");
    return (
      <View style={styles.container}>
        <Animated.Code>
          {
            () => call([y], ([y]) => console.log({ y }))
          }
        </Animated.Code>
        <View style={styles.story}>
          <View style={styles.topHalf}>
            <Animated.View
              style={{
                ...StyleSheet.absoluteFillObject,
                transform: [{ perspective: backP }, { rotateY: "180deg" }, { translateY: height / 4 }, { rotateX }, { translateY: -height / 4 }, { rotateZ: "180deg" }],
              }}
            >
              <Image source={{ uri: bottomBack }} style={styles.image} />
            </Animated.View>
            <Animated.View
              style={{
                ...StyleSheet.absoluteFillObject,
                backfaceVisibility: "hidden",
                transform: [{ perspective: frontP }, { translateY: height / 4 }, { rotateX }, { translateY: -height / 4 }],
              }}
            >
              <Image source={{ uri: topFront }} style={styles.image} />
            </Animated.View>
          </View>
          <View style={styles.bottomHalf} />
        </View>
        <Interactable
          style={{
            backgroundColor: "rgba(100, 200, 300, 0.5)", height: height * 2, position: "absolute", top: -height / 2, left: 0, right: 0,
          }}
          animatedValueY={y}
          snapPoints={[{ y: 0 }, { y: height }]}
          verticalOnly
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
