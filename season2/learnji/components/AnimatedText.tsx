import * as React from "react";
import { TextInput, TextStyle } from "react-native";
import { DangerZone } from "expo";

const { Animated } = DangerZone;
const { Value } = Animated;
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

interface TextProps {
  text: typeof Value;
  style?: TextStyle;
}

export default (props: TextProps) => {
  const { text, style } = { style: {}, ...props };
  return (
    <AnimatedTextInput
      underlineColorAndroid="transparent"
      editable={false}
      {...{ text, style }}
    />
  );
};
