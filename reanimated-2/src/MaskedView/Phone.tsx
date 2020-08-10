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
}

const r = SIZE / 2;
const center = { x: r, y: r };
const scale = (tr: Vector<number>) => {
  "worklet";
  const pos = cartesian2Canvas(
    {
      x: Math.abs(tr.x),
      y: -Math.abs(tr.y),
    },
    center
  );
  const radius = Math.hypot(pos.x, pos.y);
  return radius / r;
};

const Phone = ({ phone }: PhoneProps) => {
  const [ready, setReady] = useState(false);
  const transition = useTiming(ready, {
    duration: 600,
    easing: Easing.inOut(Easing.ease),
  });
  const style = useAnimatedStyle(() => ({
    transform: [
      { translateX: phone.translate.x },
      { translateY: phone.translate.y },
      {
        scale: mix(transition.value, 0, scale(phone.translate)),
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
        onLoadEnd={() => setReady(true)}
      />
    </MaskedView>
  );
};

export default Phone;
