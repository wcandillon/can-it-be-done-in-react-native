import * as React from "react";
import {
  View, StyleSheet, SafeAreaView, Dimensions,
} from "react-native";
import { Feather as Icon } from "@expo/vector-icons";
import { DangerZone } from "expo";

import { Profile } from "./Model";
import Card from "./Card";
import GestureHandler from "./GestureHandler2";

const { Animated } = DangerZone;
const {
  Value, interpolate, concat, Extrapolate, debug, block, sub, multiply,
} = Animated;
const { width, height } = Dimensions.get("window");

interface ProfilesProps {
  profiles: Profile[];
}

interface ProfilesState {
  index: number;
}

export default class Profiles extends React.PureComponent<ProfilesProps, ProfilesState> {
  state = {
    index: 0,
  };

  render() {
    const { profiles } = this.props;
    const { index } = this.state;
    const profile = profiles[index];
    const x = new Value(0);
    const y = new Value(0);
    const deltaX = width / 2;
    const deltaY = height / 2;
    const rotateZ = concat(
      interpolate(x, {
        inputRange: [-1 * deltaX, deltaX],
        outputRange: [15, -15],
        extrapolate: Extrapolate.CLAMP,
      }),
      "deg",
    );
    const likeOpacity = interpolate(x, {
      inputRange: [0, deltaX / 4],
      outputRange: [0, 1],
    });
    const nopeOpacity = interpolate(x, {
      inputRange: [-1 * deltaX / 4, 0],
      outputRange: [1, 0],
    });
    const translateX = x;
    const translateY = y;
    const style = {
      ...StyleSheet.absoluteFillObject,
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
          <Animated.View {...{ style }}>
            <Card {...{ profile, likeOpacity, nopeOpacity }} />
          </Animated.View>
          <GestureHandler {...{ x, y }} />
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
