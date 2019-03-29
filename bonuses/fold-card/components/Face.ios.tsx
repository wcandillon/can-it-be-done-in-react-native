import * as React from "react";
import {
  StyleSheet, ImageSourcePropType, Image, Dimensions,
} from "react-native";
import { DangerZone } from "expo";

import { toRad, translateZ } from "./AnimationHelpers";

const { Animated } = DangerZone;
const {
  Value, interpolate, Extrapolate, concat, multiply, sin, abs,
} = Animated;
const { width } = Dimensions.get("window");
const ratio = 863 / 609;
export const CARD_WIDTH = width;
export const CARD_HEIGHT = CARD_WIDTH * ratio;

interface NewTaskPartProps {
  scale: typeof Value;
  front: ImageSourcePropType;
  isOnTop?: boolean;
}

export default class NewTaskPart extends React.PureComponent<NewTaskPartProps> {
  static defaultProps = {
    isOnTop: false,
  };

  render() {
    const {
      scale, front, isOnTop,
    } = this.props;
    const perspective = CARD_HEIGHT;
    const inputRange = [0.5, 1];
    const opacity = interpolate(scale, {
      inputRange,
      outputRange: [isOnTop ? 0.6 : 0.5, 0],
      extrapolate: Extrapolate.CLAMP,
    });
    const rotateX = interpolate(scale, {
      inputRange,
      outputRange: [isOnTop ? 90 : -90, 0],
      extrapolate: Extrapolate.CLAMP,
    });
    const x = multiply(-CARD_HEIGHT / 2, sin(toRad(abs(rotateX))));
    return (
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
          transform: [
            { perspective },
            { rotateX: concat(rotateX, "deg") },
            { scale: translateZ(perspective, x) },
          ],
        }}
      >
        <Image source={front} style={styles.image} />
        <Animated.View
          style={{
            ...StyleSheet.absoluteFillObject,
            opacity,
            backgroundColor: "black",
          }}
        />
      </Animated.View>

    );
  }
}

const styles = StyleSheet.create({
  image: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
  },
});
