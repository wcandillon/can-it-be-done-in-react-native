import * as React from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import { Interactable } from "react-native-redash";
import { DangerZone, BlurView } from "expo";

const { Animated } = DangerZone;
const { Value, interpolate, Extrapolate } = Animated;

interface SwipeToCloseProps {
  translationY: typeof Value;
  driver: typeof Value;
}

export default class SwipeToClose extends React.PureComponent<SwipeToCloseProps> {
  render() {
    const { children, translationY: y, driver } = this.props;
    const scale = interpolate(y, {
      inputRange: [0, 100],
      outputRange: [1, 0.85],
      extrapolate: Extrapolate.CLAMP,
    });
    const translateY = interpolate(y, {
      inputRange: [0, 100],
      outputRange: [0, 100],
      extrapolate: Extrapolate.CLAMP,
    });
    const opacity = interpolate(driver, {
      inputRange: [0, 1],
      outputRange: [0, 1],
      extrapolate: Extrapolate.CLAMP,
    });
    return (
      <View style={StyleSheet.absoluteFill}>
        <Animated.View style={{ ...StyleSheet.absoluteFillObject, opacity }}>
          <BlurView
            tint="default"
            intensity={100}
            style={StyleSheet.absoluteFill}
          />
        </Animated.View>
        <StatusBar barStyle="light-content" />
        <Animated.View style={{ transform: [{ scale }, { translateY }] }}>
          {children}
        </Animated.View>
        <Interactable
          style={StyleSheet.absoluteFill}
          snapPoints={[{ y: 0 }, { y: 100 }]}
          animatedValueY={y}
          verticalOnly
        />
      </View>
    );
  }
}
