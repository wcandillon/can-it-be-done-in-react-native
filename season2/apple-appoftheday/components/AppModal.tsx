import * as React from "react";
import {
  View, StyleSheet, Dimensions,
} from "react-native";
import { DangerZone } from "expo";
import { runSpring, binaryInterpolation } from "react-native-redash";

import AppThumbnail from "./AppThumbnail";
import { App, Position } from "./Model";

const { width: wWidth } = Dimensions.get("window");
const { Animated } = DangerZone;
const {
  Value, Clock, block, set,
} = Animated;

export interface AppModalProps {
  app: App;
  position: Position;
}

export default ({ app, position } : AppModalProps) => {
  const clock = new Clock();
  const spring = new Value(0);
  const x = new Value(position.x);
  const y = new Value(position.y);
  const width = new Value(position.width);
  const height = new Value(position.height);
  return (
    <View style={StyleSheet.absoluteFill}>
      <Animated.Code>
        {
          () => block([
            set(spring, runSpring(clock, 0, 1)),
            set(x, binaryInterpolation(spring, x, 0)),
            set(y, binaryInterpolation(spring, y, 0)),
            set(width, binaryInterpolation(spring, width, wWidth)),
          ])
        }
      </Animated.Code>
      <Animated.View
        style={{
          width,
          height,
          top: y,
          left: x,
        }}
      >
        <AppThumbnail {...{ app }} />
      </Animated.View>
    </View>
  );
};
