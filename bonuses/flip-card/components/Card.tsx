import * as React from "react";
import {
  View, Image, StyleSheet, ImageSourcePropType, Dimensions, Platform, Text,
} from "react-native";
import { DangerZone } from "expo";

const { Animated } = DangerZone;
const {
  Value, concat, interpolate, cond, and, greaterOrEq, lessThan,
} = Animated;
const { width } = Dimensions.get("window");
const perspective = Platform.OS === "ios" ? 1000 : undefined;

interface CardProps {
  front: ImageSourcePropType;
  back: ImageSourcePropType;
  x: Value
}

export default class Card extends React.PureComponent<CardProps> {
  render() {
    const { front, back, x } = this.props;
    const rotateYAsDeg = interpolate(x, {
      inputRange: [0, width],
      outputRange: [0, 180],
    });
    const rotateY = concat(rotateYAsDeg, "deg");
    const opacity = Platform.OS === "android" ? cond(
      and(greaterOrEq(rotateYAsDeg, -90), lessThan(rotateYAsDeg, 90)),
      1,
      0,
    ) : 1;
    const backOpacity = Platform.OS === "android" ? cond(opacity, 0, 1) : 1;
    /*
          */
    return (
      <View style={styles.container}>
        <Animated.View style={{
          ...StyleSheet.absoluteFillObject,
          justifyContent: "center",
          alignItems: "center",
          opacity: backOpacity,
          backfaceVisibility: "hidden",
          transform: [
            { perspective },
            { rotateY: "180deg" },
            { rotateY },
          ],
        }}
        >
          <Image source={back} style={styles.image} />
          <Text style={{ color: "white", fontSize: 72 }}>Hello</Text>
        </Animated.View>
        <Animated.View style={{
          ...StyleSheet.absoluteFillObject,
          opacity,
          backfaceVisibility: "hidden",
          transform: [
            { perspective },
            { rotateY },
          ],
        }}
        >
          <Image source={front} style={styles.image} />
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 306,
    height: 434,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
  },
});
