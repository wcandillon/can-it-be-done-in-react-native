import * as React from "react";
import { View, Text, TouchableWithoutFeedback } from "react-native";
import { DangerZone } from "expo";

import { App, Position } from "./Model";
import AppThumbnail from "./AppThumbnail";

const { Animated } = DangerZone;
const measure = async (ref: View | Text | ScrollView): Promise<Position> => new Promise(resolve => ref.measureInWindow((x, y, width, height) => resolve({
  x, y, width, height,
})));

export type Apps = App[];

interface AppProps {
  app: App;
  startTransition: (app: App, position: Position) => void;
}

export default class extends React.PureComponent<AppProps> {
  container = React.createRef();

  startTransition = async () => {
    const { app, startTransition } = this.props;
    const position = await measure(this.container.current.getNode());
    startTransition(app, position);
  };

  render() {
    const { app } = this.props;
    return (
      <TouchableWithoutFeedback onPress={this.startTransition}>
        <Animated.View ref={this.container}>
          <AppThumbnail {...{ app }} />
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}
