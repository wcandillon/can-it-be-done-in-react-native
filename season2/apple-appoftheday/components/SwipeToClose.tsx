import * as React from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import { BlurView, DangerZone } from "expo";

import { Interactable, clockRunning } from "react-native-redash";
import { SpringValue } from "./Spring";

const { Animated } = DangerZone;
const {
  Value, interpolate, Extrapolate, cond, and, eq, or,
} = Animated;

interface SwipeToCloseProps {
  y: typeof Value;
  opacity: typeof Value;
  scale: SpringValue
}

export default class SwipeToClose extends React.PureComponent<SwipeToCloseProps> {
  render() {
    const {
      children, y, opacity, scale: s,
    } = this.props;
    const scale = cond(
      or(and(clockRunning(s.clock), eq(s.hasSprung, 1)), eq(s.hasSprungBack, 1)),
      s.value,
      interpolate(y, {
        inputRange: [0, 100],
        outputRange: [1, 0.75],
        extrapolate: Extrapolate.CLAMP,
      }),
    );
    return (
      <View style={StyleSheet.absoluteFill}>
        <Animated.View style={[StyleSheet.absoluteFill, { opacity }]}>
          <BlurView
            tint="default"
            intensity={100}
            style={StyleSheet.absoluteFill}
          />
        </Animated.View>
        <StatusBar barStyle="light-content" />
        <Animated.View
          style={{
            ...StyleSheet.absoluteFillObject,
            transform: [{ scale }],
          }}
        >
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
