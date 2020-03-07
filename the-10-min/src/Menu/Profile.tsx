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
  block,
  cond,
  debug,
  diffClamp,
  divide,
  eq,
  multiply,
  not,
  set,
  sub,
  useCode
} from "react-native-reanimated";
import {
  bInterpolate,
  clamp,
  onGestureEvent,
  withSpring
} from "react-native-redash";
import { StyleGuide } from "../components";

const d = Dimensions.get("window");
const width = d.width * 0.75;
const height = d.height * 0.5;
const perspective = { perspective: 1000 };
const MIN = -width;
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
}

export default ({ open, transition }: ProfileProps) => {
  const triggeredManually = new Value<0 | 1>(0);
  const offset = new Value(MIN);
  const velocityX = new Value(0);
  const translationX = new Value(0);
  const state = new Value(State.UNDETERMINED);
  const translateX = withSpring({
    value: clamp(translationX, MIN, MAX + PADDING),
    velocity: velocityX,
    snapPoints: [MIN, MAX],
    state,
    onSnap: ([point]) => {
      if (point === MIN) {
        triggeredManually.setValue(1);
        open.setValue(0);
      }
    },
    offset
  });
  const trx = sub(1, divide(translateX, MIN));
  const opacity = bInterpolate(trx, 0.5, 1);
  const scale = bInterpolate(trx, 1, 0.9);
  const rotateY = bInterpolate(trx, Math.PI / 2, 0);
  const gestureHandler = onGestureEvent({
    translationX,
    velocityX,
    state
  });
  useCode(
    () =>
      block([
        cond(eq(state, State.ACTIVE), set(triggeredManually, 0)),
        cond(eq(open, transition), set(triggeredManually, 0)),
        cond(
          not(triggeredManually),
          set(offset, sub(MIN, multiply(transition, MIN)))
        )
      ]),
    [offset, open, state, transition, triggeredManually]
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
