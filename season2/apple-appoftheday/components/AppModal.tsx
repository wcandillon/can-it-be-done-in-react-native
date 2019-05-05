import * as React from "react";
import {
  View, StyleSheet,
} from "react-native";
import { DangerZone } from "expo";

import AppThumbnail from "./AppThumbnail";
import { App, Position } from "./Model";

const { Animated } = DangerZone;
const { Value } = Animated;

export interface AppModalProps {
  app: App;
  position: Position;
}

export default class AppModal extends React.PureComponent<AppModalProps> {
  constructor(props: AppModalProps) {
    super(props);
    const {
      position: {
        x, y, width, height,
      },
    } = props;
    this.x = new Value(x);
    this.y = new Value(y);
    this.width = new Value(width);
    this.height = new Value(height);
  }

  x: typeof Value;

  y: typeof Value;

  width: typeof Value;

  height: typeof Value;

  render() {
    const {
      x, y, width, height,
    } = this;
    const { app } = this.props;
    return (
      <View style={StyleSheet.absoluteFill}>
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
  }
}
