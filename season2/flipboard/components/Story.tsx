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
    const interpolation = bottom ? bottomInterpolation : topInterpolation;
    const rotateX = concat(interpolation, "deg");
    const topSnapPoints = [{ id: 0, y: 0 }, { id: -1, y: height }];
    const bottomSnapPoints = [{ id: 1, y: -height }, { id: 0, y: 0 }];
    const snapPoints = bottom ? bottomSnapPoints : topSnapPoints;
    const coef = bottom ? -1 : 1;
    return (
      <View style={{ flex: 1, zIndex: isDragging ? 100 : 0 }}>
        <View style={styles.story}>
          <Animated.View
            style={{
              ...StyleSheet.absoluteFillObject,
              transform: [backPerspective, { rotateY: "180deg" }, { translateY: coef * height / 4 }, { rotateX }, { translateY: coef * -height / 4 }, { rotateZ: "180deg" }],
            }}
          >
            <Image source={{ uri: back }} style={styles.image} />
          </Animated.View>
          <Animated.View
            style={{
              ...StyleSheet.absoluteFillObject,
              backfaceVisibility: "hidden",
              transform: [frontPerspective, { translateY: coef * height / 4 }, { rotateX }, { translateY: coef * -height / 4 }],
            }}
          >
            <Image source={{ uri: front }} style={styles.image} />
          </Animated.View>
        </View>
        <Interactable
          style={{
            height, position: "absolute", top: bottom ? 0 : -height / 2, left: 0, right: 0,
          }}
          animatedValueY={y}
          verticalOnly
          {...{ snapPoints, onDrag, onSnap }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  story: {
    flex: 1,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
    resizeMode: "cover",
  },
});
