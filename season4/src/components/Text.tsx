import React, { ReactNode } from "react";
import { TextProps as OriginalTextProps, Text as RNText } from "react-native";

import StyleGuide from "./StyleGuide";

export interface TextProps extends OriginalTextProps {
  dark?: boolean;
  type?: keyof typeof StyleGuide["typography"];
  children: ReactNode;
}

const Text = ({ dark, type, style, children }: TextProps) => {
  const color = dark ? "white" : "black";
  return (
    <RNText style={[StyleGuide.typography[type || "body"], { color }, style]}>
      {children}
    </RNText>
  );
};

export default Text;
