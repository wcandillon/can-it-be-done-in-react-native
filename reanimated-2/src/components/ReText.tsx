import * as React from "react";
import { TextStyle } from "react-native";
import Animated, { useAnimatedProps } from "react-native-reanimated";
import { TextInput } from "react-native-gesture-handler";

interface TextProps {
  text: any;
  style?: TextStyle;
}

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
const ReText = (props: TextProps) => {
  const { text, style } = { style: {}, ...props };
  const animatedProps = useAnimatedProps(() => {
    return {
      text: text.value,
    };
  });
  return (
    <AnimatedTextInput
      underlineColorAndroid="transparent"
      editable={false}
      {...{ style, animatedProps }}
    />
  );
};

export default ReText;
