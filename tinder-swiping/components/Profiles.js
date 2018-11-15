// @flow
import * as React from "react";
import {
  SafeAreaView, StyleSheet, View, Dimensions,
} from "react-native";
import { Feather as Icon } from "@expo/vector-icons";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";

import type { Profile } from "./Profile";
import Card from "./Card";

function runSpring(clock, value, velocity, dest) {
  const state = {
    finished: new Value(0),
    velocity: new Value(0),
    position: new Value(0),
    time: new Value(0),
  };

  const config = {
    damping: 7,
    mass: 1,
    stiffness: 121.6,
    overshootClamping: false,
    restSpeedThreshold: 0.001,
    restDisplacementThreshold: 0.001,
    toValue: new Value(0),
  };

  return [
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.velocity, velocity),
      set(state.position, value),
      set(config.toValue, dest),
      startClock(clock),
    ]),
    spring(clock, state, config),
    cond(state.finished, stopClock(clock)),
    state.position,
  ];
}

const { width } = Dimensions.get("window");
const {
  neq,
  add,
  spring,
  cond,
  diff,
  divide,
  eq,
  event,
  exp,
  lessThan,
  greaterThan,
  and,
  defined,
  call,
  block,
  multiply,
  pow,
  set,
  abs,
  clockRunning,
  greaterOrEq,
  lessOrEq,
  sqrt,
  startClock,
  stopClock,
  sub,
  Clock,
  Value,
  concat,
  interpolate,
} = Animated;

type ProfilesProps = {
  profiles: Profile[],
};

type ProfilesState = {
  profiles: Profile[],
};

export default class Profiles extends React.PureComponent<ProfilesProps, ProfilesState> {
  constructor(props: ProfilesProps) {
    super(props);
    const TOSS_SEC = 0.2;
    const clockX = new Clock();
    const clockY = new Clock();
    const translationX = new Value(0);
    const translationY = new Value(0);
    const velocityX = new Value(0);
    const state = new Value(State.UNDETERMINED);

    const { profiles } = props;
    this.state = { profiles };
    this.onGestureEvent = event(
      [
        {
          nativeEvent: {
            translationX,
            translationY,
            velocityX,
            state,
          },
        },
      ],
      { useNativeDriver: true },
    );
    this.translateY = translationY;
    const snapPoint = cond(
      lessOrEq(velocityX, 0),
      0,
      cond(
        lessThan(translationX, 0),
        -width,
        width,
      ),
    );
    this.translateY = cond(
      eq(state, State.END),
      [
        set(translationY, runSpring(clockY, translationY, 0, 0)),
        translationY,
      ],
      translationY,
    );
    this.translateX = cond(
      eq(state, State.END),
      [
        set(translationX, runSpring(clockX, translationX, velocityX, snapPoint)),
        translationX,
      ],
      translationX,
    );
  }

  render() {
    const { onGestureEvent, translateX, translateY } = this;
    const { profiles: [lastProfile, ...profiles] } = this.state;
    const rotateZ = concat(
      interpolate(translateX, {
        inputRange: [-width, width],
        outputRange: [-30, 30],
      }),
      "deg",
    );
    const style = {
      ...StyleSheet.absoluteFillObject,
      zIndex: 900,
      transform: [
        { translateX },
        { translateY },
        { rotateZ },
      ],
    };
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Icon name="user" size={32} color="gray" />
          <Icon name="message-circle" size={32} color="gray" />
        </View>
        <View style={styles.cards}>
          {
              profiles.map(profile => (
                <Card key={profile.id} {...{ profile }} />
              ))
          }
          <PanGestureHandler
            onHandlerStateChange={onGestureEvent}
            {...{ onGestureEvent }}
          >
            <Animated.View {...{ style }}>
              <Card profile={lastProfile} />
            </Animated.View>
          </PanGestureHandler>
        </View>
        <View style={styles.footer}>
          <View style={styles.circle}>
            <Icon name="x" size={32} color="#ec5288" />
          </View>
          <View style={styles.circle}>
            <Icon name="heart" size={32} color="#6ee3b4" />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fbfaff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },
  cards: {
    flex: 1,
    margin: 8,
    zIndex: 100,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 16,
  },
  circle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    shadowColor: "gray",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 2,
  },
});
