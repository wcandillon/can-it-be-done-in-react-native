import * as React from "react";
import {
  View, StyleSheet, Dimensions, Image, Platform,
} from "react-native";
import { DangerZone } from "expo";

import Interactable from "./Interactable";

const {
  Animated,
} = DangerZone;
const {
  Value, Extrapolate, interpolate, concat, cond, and, greaterOrEq, lessThan, multiply,
} = Animated;
const { height } = Dimensions.get("window");
const backPerspective = Platform.OS === "android" ? {} : { perspective: -1000 };
const frontPerspective = Platform.OS === "android" ? {} : { perspective: 1000 };

interface StoriesProps {
  front: string;
  back: string;
  bottom?: boolean;
  onSnap: (id: number) => void;
}

interface StoriesState {
  isDragging: boolean;
}

export default class Story extends React.PureComponent<StoriesProps, StoriesState> {
  static defaultProps = {
    bottom: false,
  };

  state: StoriesState = {
    isDragging: false,
  };

  y = new Value(0);

  onDrag = () => {
    const { isDragging } = this.state;
    if (!isDragging) {
      this.setState({ isDragging: !isDragging });
    }
  }

  onSnap = ({ nativeEvent: { id } }: { nativeEvent: { id: string }}) => {
    const { onSnap } = this.props;
    onSnap(id);
  }

  render() {
    const { y, onDrag, onSnap } = this;
    const { front, back, bottom } = this.props;
    const { isDragging } = this.state;
    const topInterpolation = interpolate(y, {
      inputRange: [0, height],
      outputRange: [0, -180],
      extrapolate: Extrapolate.CLAMP,
    });
    const bottomInterpolation = interpolate(y, {
      inputRange: [-height, 0],
      outputRange: [180, 0],
      extrapolate: Extrapolate.CLAMP,
    });
    const rotateXAsDeg = bottom ? bottomInterpolation : topInterpolation;
    const rotateX = concat(rotateXAsDeg, "deg");
    const topSnapPoints = [{ id: 0, y: 0 }, { id: -1, y: height }];
    const bottomSnapPoints = [{ id: 1, y: -height }, { id: 0, y: 0 }];
    const snapPoints = bottom ? bottomSnapPoints : topSnapPoints;
    const coef = bottom ? -1 : 1;
    // This version of RN doesn't have backfaceVisibility: "hidden" support on Android
    // So we copy its implementation 1-to-1 using Reanimated
    // https://github.com/facebook/react-native/commit/0cce0a62c1ab8d9687c9decd69cd204c99e1ec6c#diff-341b84e8097867e8de4179e496ec53d5R863
    const opacity = Platform.OS === "android" ? cond(and(greaterOrEq(rotateXAsDeg, -90), lessThan(rotateXAsDeg, 90)), 1, 0) : 1;
    const backOpacity = Platform.OS === "android" ? cond(opacity, 0, 1) : 1;
    const zIndex = Platform.OS === "android" ? "elevation" : "zIndex";
    return (
      <View style={{ flex: 1, [zIndex]: isDragging ? 1 : 0 }}>
        <Animated.View
          style={{
            ...StyleSheet.absoluteFillObject,
            opacity: backOpacity,
            transform: [
              backPerspective,
              { rotateY: "180deg" },
              { translateY: coef * height / 4 },
              {
                rotateX: Platform.OS === "android"
                  ? concat(multiply(rotateXAsDeg, -1), "deg")
                  : rotateX,
              },
              { translateY: coef * -height / 4 },
              { rotateZ: "180deg" }],
          }}
        >
          <Image source={{ uri: back }} style={styles.image} />
        </Animated.View>
        <Animated.View
          style={{
            ...StyleSheet.absoluteFillObject,
            backfaceVisibility: "hidden",
            opacity,
            transform: [frontPerspective, { translateY: coef * height / 4 }, { rotateX }, { translateY: coef * -height / 4 }],
          }}
        >
          <Image source={{ uri: front }} style={styles.image} />
        </Animated.View>
        <Interactable
          style={StyleSheet.absoluteFill}
          animatedValueY={y}
          verticalOnly
          {...{ snapPoints, onDrag, onSnap }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({

  image: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
    resizeMode: "cover",
  },
});