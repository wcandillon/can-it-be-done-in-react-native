import * as React from "react";
import {
  View, Text, TouchableWithoutFeedback, StyleSheet, Dimensions, Platform,
} from "react-native";
import { DangerZone, Constants } from "expo";
import { App, Position } from "./Model";
import AppThumbnail from "./AppThumbnail";

const { Animated } = DangerZone;
const { Value, cond, eq } = Animated;
const { width, height } = Dimensions.get("window");
const offset = (v: number) => (Platform.OS === "android" ? (v + Constants.statusBarHeight) : v);
const measure = async (ref: View | Text | ScrollView): Promise<Position> => new Promise(resolve => ref.measureInWindow((x, y, width, height) => resolve({
  x, y: offset(y), width, height,
})));

export type Apps = App[];

interface AppProps {
  app: App;
  open: (app: App, position: Position) => void;
  activeAppId: typeof Value;
}

export default class extends React.PureComponent<AppProps> {
  container = React.createRef();

  startTransition = async () => {
    const { app, open } = this.props;
    const position = await measure(this.container.current.getNode());
    open(app, position);
  };

  render() {
    const { app, activeAppId } = this.props;
    return (
      <TouchableWithoutFeedback onPress={this.startTransition}>
        <Animated.View
          ref={this.container}
          style={[styles.container, { opacity: cond(eq(activeAppId, app.id), 0, 1) }]}
        >
          <AppThumbnail {...{ app }} />
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: width - 32,
    height: height / 2,
    alignSelf: "center",
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
