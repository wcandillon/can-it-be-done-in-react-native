import * as React from 'react';
import { Image, StyleSheet } from 'react-native';
import {LinearGradient} from "expo";
import Animated from "react-native-reanimated";
import { Album, MAX_HEADER_HEIGHT } from './Model';

const {interpolate, Extrapolate} = Animated;

interface CoverProps {
  album: Album;
  y: Animated.Value;
}

export default ({ album: { cover }, y }: CoverProps) => {
  const scale = interpolate(y, {
    inputRange: [-MAX_HEADER_HEIGHT, 0],
    outputRange: [2, 1],
    extrapolateRight: Extrapolate.CLAMP
  });
  const opacity = interpolate(y, {
    inputRange: [-MAX_HEADER_HEIGHT / 2, 0, MAX_HEADER_HEIGHT],
    outputRange: [0, 0.2, 1],
    extrapolateRight: Extrapolate.CLAMP
  });
  return (
    <Animated.View style={[styles.container, { transform: [{ scale }] }]}>
      <Image style={styles.image} source={cover}  />
      <Animated.View style={[styles.mask, { opacity }]} />
      <LinearGradient
        style={StyleSheet.absoluteFill} 
        start={[0, 0.61]}
        end={[0, 1]} 
        colors={['rgba(0, 0, 0, 0.3)', 'black']} 
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: MAX_HEADER_HEIGHT
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
  },
  mask: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "black"
  }
});