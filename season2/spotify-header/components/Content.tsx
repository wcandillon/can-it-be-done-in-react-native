import * as React from "react";
import { StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";
import { onScroll } from "react-native-redash";
import {LinearGradient} from "expo";

import { Album, MAX_HEADER_HEIGHT } from "./Model";
import Track from "./Track";

const {interpolate, Extrapolate} = Animated;

interface ContentProps {
  album: Album;
  y: Animated.Value<number>;
}

export default ({ album: { artist, tracks }, y }: ContentProps) => {
  const height = interpolate(y, {
    inputRange: [-MAX_HEADER_HEIGHT, 0],
    outputRange: [0, MAX_HEADER_HEIGHT],
    extrapolateRight: Extrapolate.CLAMP
  });
  return (
    <Animated.ScrollView
      onScroll={onScroll({ y })}
      style={styles.container}
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={1}
    > 
      <View style={styles.header}>
        <Animated.View style={{ position: "absolute", left: 0, bottom: 0, right: 0, height }}>
          <LinearGradient
            style={StyleSheet.absoluteFill} 
            start={[0, 0.3]}
            end={[0, 1]} 
            colors={['transparent', 'rgba(0, 0, 0, 0.2)', 'black']} 
          />
        </Animated.View>
      </View>
      {
        tracks.map((track, index) => (
          <Track
            key={index}
            {...{track, index, artist}}
          />
        ))
      }
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: MAX_HEADER_HEIGHT
  },
  mask: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "black"
  }
});
