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

const { width } = Dimensions.get("window");
const {
  Value, event, interpolate, concat,
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
    this.translateX = new Value(0);
    this.translateY = new Value(0);
    this.velocityX = new Value(0);
    const { profiles } = props;
    this.state = { profiles };
    this.onGestureEvent = event(
      [
        {
          nativeEvent: {
            translationX: this.translateX,
            translationY: this.translateY,
            velocityX: this.velocityX,
          },
        },
      ],
      { useNativeDriver: true },
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
