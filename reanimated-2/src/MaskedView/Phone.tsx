import React, { useState } from "react";
import { StyleSheet, Image } from "react-native";
import MaskedView from "@react-native-community/masked-view";

import { PhoneModel, SIZE } from "./Phones";
import Animated, { useAnimatedStyle, Easing } from "react-native-reanimated";
import { useTiming, mix, Vector } from "../components/AnimatedHelpers";

interface PhoneProps {
  phone: PhoneModel;
}

const r = SIZE / 2;
const MAX_SCALE = SIZE / Math.hypot(r, r);
const R = MAX_SCALE * r;
const scale = (pos: Vector<number>) => {
  "worklet";
  const R2 = R + Math.hypot(pos.x, pos.y);
  return R2 / r;
};

const Phone = ({ phone }: PhoneProps) => {
  const [ready, setReady] = useState(false);
  const transition = useTiming(ready, {
    duration: 600,
    easing: Easing.inOut(Easing.ease),
  });
  console.log(SIZE / Math.hypot(SIZE / 2, SIZE / 2));
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
