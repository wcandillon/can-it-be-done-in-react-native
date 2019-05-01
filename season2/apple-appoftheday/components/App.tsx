import * as React from "react";
import {
  View, ImageSourcePropType, StyleSheet, Dimensions, Image, Text,
} from "react-native";
import { DangerZone, GestureHandler } from "expo";

const { Animated } = DangerZone;
const {
  Clock, Value, event, cond, eq,
} = Animated;
const { TapGestureHandler, State } = GestureHandler;

export interface App {
  id: string;
  title: string;
  subtitle: string;
  source: ImageSourcePropType;
  content: string;
}

export type Apps = App[];

interface AppProps {
  app: App;
}

const { width, height } = Dimensions.get("window");

export default class extends React.PureComponent<AppProps> {
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
    const timingConfig = { toValue: 0.95, duration: 100 };
    const scale = cond(eq(state, State.BEGAN), runTiming(clock, 1, timingConfig), 1);
    return (
      <TapGestureHandler {...{ onHandlerStateChange }}>
        <Animated.View style={[styles.container, { transform: [{ scale }] }]}>
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
