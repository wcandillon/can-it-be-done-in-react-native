import React, { useState } from "react";
import { View } from "react-native";
import Animated, {
  call,
  divide,
  floor,
  modulo,
  onChange,
  sub,
  useCode
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";

import { Candle } from "./Candle";

interface HeaderProps {
  translateX: Animated.Node<number>;
  caliber: number;
  candles: Candle[];
}

export default ({ translateX, caliber, candles }: HeaderProps) => {
  const [candle, setCandle] = useState(candles[0]);
  useCode(
    () =>
      onChange(
        translateX,
        call([floor(divide(translateX, caliber))], ([index]) => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          setCandle(candles[index]);
        })
      ),
    [caliber, candles, translateX]
  );
  return <View style={{ height: 200 }} />;
};
