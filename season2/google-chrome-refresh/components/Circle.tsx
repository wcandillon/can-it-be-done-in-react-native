import * as React from "react";
import { View } from "react-native";

interface CircleProps {
  size: number;
}

export default class Circle extends React.PureComponent<CircleProps> {
  render() {
    const { size } = this.props;
    const style = {
      height: size * 2,
      width: size * 2,
      borderRadius: size,
      backgroundColor: "#656667",
    };
    return (
      <View {...{ style }} />
    );
  }
}
