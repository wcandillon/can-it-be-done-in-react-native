import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Dimensions, Image } from "react-native";

import { phones, SIZE } from "./Phones";
import { RectButton } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  useDerivedValue,
} from "react-native-reanimated";
import RNMaskedView from "@react-native-community/masked-view";
import { useTiming } from "../components/AnimatedHelpers";

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  picture: {
    width: SIZE,
    height: SIZE,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
  },
  title: {
    textAlign: "center",
  },
  colors: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  button: {
    width: width / 4,
    height: width / 4,
    alignSelf: "center",
    justifyContent: "center",
  },
  dot: { width: 20, height: 20, borderRadius: 10 },
});

const MaskedView = () => {
  const [{ previous, current }, setSelection] = useState({
    previous: phones[0],
    current: phones[1],
  });
  const [ready, setReady] = useState(false);
  const scale = useSharedValue(0);
  useEffect(() => {
    if (ready) {
      scale.value = 0;
      scale.value = withTiming(2, { duration: 1000 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);
  const style = useAnimatedStyle(() => {
    return {
      opacity: scale.value < 0 ? 0 : 1,
      transform: [{ scale: scale.value }],
    };
  });
  return (
    <View style={styles.container}>
      <View style={styles.picture}>
        <Image
          source={previous.picture}
          style={styles.background}
          onLoadEnd={() => setReady(true)}
        />
        <RNMaskedView
          style={StyleSheet.absoluteFill}
          maskElement={
            <Animated.View
              style={[
                {
                  ...StyleSheet.absoluteFillObject,
                  backgroundColor: "black",
                  width: undefined,
                  height: undefined,
                  borderRadius: SIZE / 2,
                },
                style,
              ]}
            />
          }
        >
          <Image source={current.picture} style={styles.background} />
        </RNMaskedView>
      </View>
      <Text style={styles.title}>{current.name}</Text>
      <View style={styles.colors}>
        {phones.map((p) => (
          <RectButton
            key={p.id}
            onPress={() => {
              setReady(false);
              setSelection({
                previous: current,
                current: p,
              });
            }}
            style={styles.button}
          >
            <View style={[styles.dot, { backgroundColor: p.color }]} />
          </RectButton>
        ))}
      </View>
    </View>
  );
};

export default MaskedView;
