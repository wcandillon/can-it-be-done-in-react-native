import React, { useState } from "react";
import { StyleSheet, Image } from "react-native";
import MaskedView from "@react-native-community/masked-view";

import { PhoneModel } from "./Phones";
import Animated, { useAnimatedStyle, Easing } from "react-native-reanimated";
import { SIZE } from "../Coinbase/ChartHelpers";
import { useTiming, mix } from "../components/AnimatedHelpers";

interface PhoneProps {
  phone: PhoneModel;
}

const Phone = ({ phone }: PhoneProps) => {
  const [ready, setReady] = useState(false);
  const transition = useTiming(ready, {
    duration: 1000,
    easing: Easing.elastic(1.5),
  });
  const style = useAnimatedStyle(() => ({
    transform: [
      { translateX: phone.translate.x },
      { translateY: phone.translate.y },
      { scale: mix(transition.value, 0, 4) },
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
