import * as React from "react";
import {
  StyleSheet, ImageSourcePropType, Image, Dimensions, View,
} from "react-native";
import { DangerZone, ImageManipulator, Asset } from "expo";

// import { toRad, translateZ } from "./AnimationHelpers";

const { Animated } = DangerZone;
const {
  Value, interpolate, Extrapolate, concat,
} = Animated;
const { width } = Dimensions.get("window");
const ratio = 863 / 609;
export const CARD_WIDTH = width;
export const CARD_HEIGHT = CARD_WIDTH * ratio;

const getSize = (uri: string): Promise<Size> => new Promise(
  (resolve, reject) => Image.getSize(uri, (width, height) => resolve({ width, height }), reject),
);

interface NewTaskPartProps {
  scale: typeof Value;
  front: ImageSourcePropType;
  isOnTop?: boolean;
}

interface NewTaskPartState {
  uri: string | null
}

export default class NewTaskPart extends React.PureComponent<NewTaskPartProps, NewTaskPartState> {
  static defaultProps = {
    isOnTop: false,
  };

  state = {
    uri: null,
  };

  async componentDidMount() {
    const { front, isOnTop } = this.props;
    const image = Asset.fromModule(front);
    await image.downloadAsync();
    const { localUri } = image;
    const { height, width } = await getSize(localUri);
    const crop = {
      crop: {
        originX: 0,
        originY: isOnTop ? 0 : height / 2,
        width,
        height: height / 2,
      },
    };
    const { uri } = await ImageManipulator.manipulateAsync(localUri, [crop]);
    this.setState({ uri });
  }

  render() {
    const { scale, isOnTop } = this.props;
    const { uri } = this.state;
    if (!uri) {
      return (
        <View
          style={{
            backgroundColor: "white",
            width: CARD_WIDTH,
            height: CARD_HEIGHT / 2,
          }}
        />
      );
    }

    const QUATER_HEIGHT = CARD_HEIGHT / 4;
    const multiplier = isOnTop ? -1 : 1;
    const inputRange = [0.5, 1];
    const opacity = interpolate(scale, {
      inputRange,
      outputRange: [isOnTop ? 0.6 : 0.5, 0],
      extrapolate: Extrapolate.CLAMP,
    });
    const rotateX = interpolate(scale, {
      inputRange,
      outputRange: [multiplier * 90, 0],
      extrapolate: Extrapolate.CLAMP,
    });
    // const perspective = 1280;
    // const x = multiply(-CARD_HEIGHT / 2, sin(toRad(abs(rotateX))));
    return (
      <Animated.View
        style={{
          width: CARD_WIDTH,
          height: CARD_HEIGHT / 2,
          transform: [
            { translateY: multiplier * -QUATER_HEIGHT },
            { rotateX: concat(rotateX, "deg") },
            { translateY: multiplier * QUATER_HEIGHT },
            // { scale: translateZ(perspective, x) },
          ],
        }}
      >
        <Image source={{ uri }} style={styles.image} />
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
    resizeMode: "cover",
  },
});
