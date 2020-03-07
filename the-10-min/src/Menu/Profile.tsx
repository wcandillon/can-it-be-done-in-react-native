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
  add,
  cond,
  debug,
  diffClamp,
  divide,
  eq,
  multiply,
  neq,
  onChange,
  set,
  sub,
  useCode
} from "react-native-reanimated";
import {
  bInterpolate,
  onGestureEvent,
  withOffset,
  withSpring,
  withTransition
} from "react-native-redash";

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
  divider: {}
});

interface RowProps {
  icon: string;
  label: string;
  href: string;
}

const Row = ({ icon, label, href }: RowProps) => (
  <TouchableOpacity onPress={() => Linking.openURL(href)}>
    <View>
      <Icon name={icon} />
      <Text>{label}</Text>
    </View>
  </TouchableOpacity>
);

interface ProfileProps {
  open: Animated.Value<number>;
}

export default ({ open }: ProfileProps) => {
  const offset = new Value(0);
  const velocityX = new Value(0);
  const translationX = new Value(0);
  const state = new Value(State.UNDETERMINED);
  const translateX = withSpring({
    value: diffClamp(translationX, MIN, MAX + PADDING),
    velocity: velocityX,
    snapPoints: [MIN, MAX],
    state,
    onSnap: ([point]) => point === MIN && open.setValue(0),
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
  const transition = withTransition(open);
  useCode(() => set(offset, sub(MIN, multiply(transition, MIN))), [
    offset,
    transition
  ]);
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
          <Text>William Candillon</Text>
          <Text>https://www.youtube.com/user/wcandill</Text>
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
