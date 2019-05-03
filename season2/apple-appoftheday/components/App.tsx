import * as React from "react";
import {
  View, StyleSheet, Dimensions, Image, Text, ImageRequireSource,
} from "react-native";
import { DangerZone, GestureHandler } from "expo";
import { runTiming } from "react-native-redash";

export interface Position {
  x: number;
  y: number;
  width: number;
  height: number;
}

const { Animated, Easing } = DangerZone;
const {
  Clock, Value, event, cond, eq, call,
} = Animated;
const { TapGestureHandler, State } = GestureHandler;
const measure = async (ref: View | Text | ScrollView): Promise<Position> => new Promise(resolve => ref.measureInWindow((x, y, width, height) => resolve({
  x, y, width, height,
})));
const { width, height } = Dimensions.get("window");

export interface App {
  id: string;
  title: string;
  subtitle: string;
  source: ImageRequireSource;
  content: string;
}

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
    const { app: { source, title, subtitle } } = this.props;
    const clock = new Clock();
    const state = new Value(State.UNDETERMINED);
    const onHandlerStateChange = event([
      {
        nativeEvent: {
          state,
        },
      },
    ]);
    const duration = 100;
    const easing = Easing.inOut(Easing.ease);
    const beganConfig = { toValue: 0.95, duration, easing };
    const endConfig = { toValue: 1, duration, easing };
    const scale = cond(
      eq(state, State.BEGAN),
      [
        call([], this.startTransition),
        runTiming(clock, 1, beganConfig),
      ],
      cond(
        eq(state, State.FAILED),
        runTiming(clock, 0.95, endConfig),
        1,
      ),
    );
    return (
      <TapGestureHandler {...{ onHandlerStateChange }}>
        <Animated.View ref={this.container} style={[styles.container, { transform: [{ scale }] }]}>
          <Image style={styles.image} {...{ source }} />
          <View style={styles.content}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
          </View>
        </Animated.View>
      </TapGestureHandler>
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
  content: {
    ...StyleSheet.absoluteFillObject,
    padding: 16,
    justifyContent: "space-between",
  },
  title: {
    color: "white",
    fontSize: 34,
    lineHeight: 41,
    fontWeight: "bold",
  },
  subtitle: {
    color: "white",
    fontSize: 18,
  },
  image: {
    borderRadius: 8,
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
  },
});
