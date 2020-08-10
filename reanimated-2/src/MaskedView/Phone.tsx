import React, { useState } from "react";
import { StyleSheet, Image } from "react-native";
import MaskedView from "@react-native-community/masked-view";

import { PhoneModel, SIZE } from "./Phones";
import Animated, { useAnimatedStyle, Easing } from "react-native-reanimated";
import {
  useTiming,
  mix,
  Vector,
  cartesian2Canvas,
} from "../components/AnimatedHelpers";

interface PhoneProps {
  phone: PhoneModel;
  selected: boolean;
}

const Phone = ({ phone, selected }: PhoneProps) => {
  const transition = useTiming(selected, {
    duration: 600,
    easing: Easing.inOut(Easing.ease),
  });
  const style = useAnimatedStyle(() => ({
    transform: [
      {
        translateY:
          SIZE / 2 -
          (SIZE / 2) * Math.min(mix(transition.value, 0, Math.SQRT2), 1),
      },
      {
        scale: mix(transition.value, 0, Math.SQRT2),
      },
    ],
  }));
  return (
    <MaskedView
      style={StyleSheet.absoluteFill}
      maskElement={
        <Animated.View
          style={[
            {
              ...StyleSheet.absoluteFillObject,
              backgroundColor: "black",
              width: undefined,
              height: undefined,
              borderRadius: SIZE / 2,
            },
            style,
          ]}
        />
      }
    >
      <Image
        source={phone.picture}
        style={{
          ...StyleSheet.absoluteFillObject,
          width: undefined,
          height: undefined,
        }}
      />
    </MaskedView>
  );
};

export default Phone;
