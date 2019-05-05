import * as React from "react";
import {
  View, StyleSheet,
} from "react-native";
import Animated from "react-native-reanimated";

import AppThumbnail from "./AppThumbnail";
import { App, Position } from "./Model";

export interface AppModalProps {
  app: App;
  position: Position;
}

export default class AppModal extends React.PureComponent<AppModalProps> {
  render() {
    const {
      app,
      position: {
        x, y, width, height,
      },
    } = this.props;
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
