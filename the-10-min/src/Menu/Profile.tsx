import React from "react";
import {
  Dimensions,
  Image,
  Linking,
  StyleSheet,
  Text,
  View
} from "react-native";
import {
  PanGestureHandler,
  State,
  TouchableOpacity
} from "react-native-gesture-handler";
import { Feather as Icon } from "@expo/vector-icons";
import Animated, {
  Value,
  and,
  block,
  cond,
  debug,
  divide,
  eq,
  lessThan,
  multiply,
  not,
  set,
  sub,
  useCode
} from "react-native-reanimated";
import {
  approximates,
  bInterpolate,
  clamp,
  onGestureEvent,
  snapPoint,
  withSpring
} from "react-native-redash";
import { LinearGradient } from "expo-linear-gradient";

import { StyleGuide } from "../components";

const d = Dimensions.get("window");
const width = d.width * 0.75;
const height = d.height * 0.5;
const perspective = { perspective: 1000 };
const alpha = Math.PI / 4;
const MIN = -width * Math.tan(alpha);
const MAX = 0;
const PADDING = 100;
const styles = StyleSheet.create({
  container: {
    width,
    height,
    borderRadius: 24,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center"
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 24
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50
  },
  title: {
    fontWeight: "bold",
    marginTop: 16
  },
  handle: {
    color: StyleGuide.palette.primary,
    textDecorationLine: "underline"
  },
  divider: {
    height: 1,
    backgroundColor: "#D8DAE0",
    width: "100%",
    marginVertical: 32
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8
  },
  icon: {
    marginRight: 8
  },
  label: {
    fontSize: 16,
    fontWeight: "500"
  }
});

interface RowProps {
  icon: string;
  label: string;
  href: string;
}

const Row = ({ icon, label, href }: RowProps) => (
  <TouchableOpacity onPress={() => Linking.openURL(href)}>
    <View style={styles.row}>
      <Icon name={icon} size={24} style={styles.icon} />
      <Text style={styles.label}>{label}</Text>
    </View>
  </TouchableOpacity>
);

interface ProfileProps {
  open: Animated.Value<number>;
  transition: Animated.Node<number>;
  triggeredManually: Animated.Value<0 | 1>;
}

export default ({ open, transition, triggeredManually }: ProfileProps) => {
  const offset = new Value(MIN);
  const velocityX = new Value(0);
  const translationX = new Value(0);
  const state = new Value(State.UNDETERMINED);
  const translateX = withSpring({
    value: clamp(translationX, MIN, MAX + PADDING),
    velocity: velocityX,
    snapPoints: [MIN, MAX],
    state,
    offset
  });
  const trx = sub(1, divide(translateX, MIN));
  const opacity = bInterpolate(trx, 0.5, 1);
  const scale = bInterpolate(trx, 1, 0.9);
  const rotateY = bInterpolate(trx, alpha, 0);
  const gestureHandler = onGestureEvent({
    translationX,
    velocityX,
    state
  });
  const snapTo = snapPoint(translationX, velocityX, [MIN, MAX]);
  useCode(
    () =>
      block([
        cond(
          and(
            eq(state, State.END),
            lessThan(trx, 0.1),
            eq(snapTo, MIN),
            not(triggeredManually)
          ),
          [set(triggeredManually, 1), set(open, 0)]
        ),
        cond(
          not(triggeredManually),
          set(offset, sub(MIN, multiply(transition, MIN)))
        )
      ]),
    [offset, open, snapTo, state, transition, triggeredManually, trx]
  );
  return (
    <PanGestureHandler {...gestureHandler}>
      <Animated.View
        style={{
          opacity,
          transform: [
            perspective,
            { translateX },
            { translateX: -width / 2 },
            { rotateY },
            { translateX: width / 2 },
            { scale }
          ]
        }}
      >
        <View style={styles.container}>
          <LinearGradient
            style={styles.gradient}
            colors={["#FEFEFE", "#D2D6DE"]}
          />
          <Image
            source={require("./assets/avatar.jpg")}
            style={styles.avatar}
          />
          <Text style={styles.title}>William Candillon</Text>
          <Text style={styles.handle}>@wcandillon</Text>
          <View style={styles.divider} />
          <View>
            <Row
              icon="code"
              label="Start React Native"
              href="https://start-react-native.dev/"
            />
            <Row
              icon="youtube"
              label="YouTube"
              href="https://www.youtube.com/user/wcandill"
            />
            <Row
              icon="twitter"
              label="Twitter"
              href="https://twitter.com/wcandillon"
            />
          </View>
        </View>
      </Animated.View>
    </PanGestureHandler>
  );
};
