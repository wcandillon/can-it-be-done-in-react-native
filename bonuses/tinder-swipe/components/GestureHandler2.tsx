import * as React from "react";
import { StyleSheet, Dimensions } from "react-native";
import { DangerZone } from "expo";

import Interactable from "./Interactable";

const { Animated } = DangerZone;
const { Value } = Animated;
const { width } = Dimensions.get("window");

interface GestureHandlerProps {
  x: typeof Value;
  y: typeof Value;
}

export default class extends React.PureComponent<GestureHandlerProps> {
  render() {
    const { x, y } = this.props;
    return (
      <Interactable
        animatedValueX={x}
        animatedValueY={y}
        snapPoints={[{ x: -width }, { x: 0 }, { x: width }]}
        style={StyleSheet.absoluteFill}
      />
    );
  }
}
