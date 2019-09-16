import React, { ReactNode } from "react";
import { TextProps as OriginalTextProps, Text } from "react-native";

import StyleGuide from "./StyleGuide";

export interface TextProps extends OriginalTextProps {
  dark?: boolean;
  type?: keyof typeof StyleGuide["typography"];
  children: ReactNode;
}

export default ({ dark, type, style, children }: TextProps) => {
  const color = dark ? "white" : "black";
  return (
    <Text style={[StyleGuide.typography[type || "body"], { color }, style]}>
      {children}
    </Text>
  );
};
