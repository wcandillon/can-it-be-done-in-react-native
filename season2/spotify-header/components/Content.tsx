import * as React from "react";
import {
  StyleSheet, View, Text, ScrollView, Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated from "react-native-reanimated";
import { onScroll } from "react-native-redash";

import { Album, MAX_HEADER_HEIGHT, HEADER_DELTA, MIN_HEADER_HEIGHT } from "./Model";
import Track from "./Track";
import ShufflePlay, { BUTTON_HEIGHT } from "./ShufflePlay";
import Header from './Header';

interface ContentProps {
  album: Album;
  y: Animated.Value<number>;
  btnOpacity: Animated.Value<number>;
}

const {
  interpolate, Extrapolate, cond, eq,
} = Animated;

export default ({ album: { artist, tracks }, y, btnOpacity }: ContentProps) => {
  const height = interpolate(y, {
    inputRange: [-MAX_HEADER_HEIGHT, -32],
    outputRange: [0, MAX_HEADER_HEIGHT + 32],
    extrapolate: Extrapolate.CLAMP,
  });
  const opacity = interpolate(y, {
    inputRange: [-MAX_HEADER_HEIGHT / 2, 0, MAX_HEADER_HEIGHT / 2],
    outputRange: [0, 1, 0],
    extrapolate: Extrapolate.CLAMP,
  });
  return (
    <Animated.ScrollView
      onScroll={onScroll({ y })}
      style={styles.container}
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={1}
      // contentContainerStyle={{ paddingTop: MAX_HEADER_HEIGHT }}
      stickyHeaderIndices={[1]}
    >
      <View style={styles.header}>
        <Animated.View
          style={[styles.gradient, { height }]}
        >
          <LinearGradient
            style={StyleSheet.absoluteFill}
            start={[0, 0.3]}
            end={[0, 1]}
            colors={["transparent", "rgba(0, 0, 0, 0.2)", "black"]}
          />
        </Animated.View>
        <View style={styles.artistContainer}>
          <Animated.Text style={[styles.artist, { opacity }]}>{artist}</Animated.Text>
        </View>
      </View>
      <View style={{ zIndex: 1, marginTop: -BUTTON_HEIGHT, backgroundColor: 'back' }}>
        <Header {...{ y, artist }} />
        <ShufflePlay />
      </View>
      <View style={styles.tracks}>


        {
          tracks.map((track, key) => (
            <Track
              index={key + 1}
              {...{ track, key, artist }}
            />
          ))
        }
      </View>
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: MIN_HEADER_HEIGHT - BUTTON_HEIGHT/2,
  },
  header: {
    height: MAX_HEADER_HEIGHT - BUTTON_HEIGHT,
  },
  gradient: {
    position: "absolute",
    left: 0,
    bottom: 0,
    right: 0,
    alignItems: "center",
  },
  artistContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  artist: {
    textAlign: "center",
    color: "white",
    fontSize: 48,
    fontWeight: "bold",
  },
  tracks: {
    paddingTop: 32,
    backgroundColor: "black",
  },
});
