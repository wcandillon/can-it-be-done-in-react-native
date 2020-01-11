import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Sound } from "expo-av/build/Audio";
import { ReText, withTransition } from "react-native-redash";
import Animated, { Value, concat, multiply } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row"
  },
  bar: {
    marginVertical: 16,
    flex: 1,
    height: 16
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 8
  },
  label: {
    marginHorizontal: 8,
    fontFamily: "Chicago",
    width: 45,
    fontSize: 12,
    textAlign: "center"
  }
});

const minutes = (v: number) => {
  const m = Math.floor(v / (60 * 1000));
  return m < 10 ? `0${m}` : `${m}`;
};

const seconds = (v: number) => {
  const s = Math.floor((v % (60 * 1000)) / 1000);
  return s < 10 ? `0${s}` : `${s}`;
};

interface ProgressBarProps {
  playback: Sound;
}

export default ({ playback }: ProgressBarProps) => {
  const progress = new Value<number>(0);
  const position = new Value<string>("00:00");
  const total = new Value<string>("00:00");
  const transition = withTransition(progress);
  useEffect(() => {
    playback.setOnPlaybackStatusUpdate(status => {
      if (status.isLoaded) {
        const { positionMillis } = status;
        const { playableDurationMillis } = status;
        if (playableDurationMillis) {
          progress.setValue(positionMillis / playableDurationMillis);
          position.setValue(
            `${minutes(positionMillis)}:${seconds(positionMillis)}`
          );
          total.setValue(
            `${minutes(playableDurationMillis)}:${seconds(
              playableDurationMillis
            )}`
          );
        }
      }
    });
  }, [playback, position, progress, total]);
  return (
    <View style={styles.container}>
      <ReText style={styles.label} text={position} />
      <View style={styles.bar}>
        <LinearGradient
          style={styles.gradient}
          colors={["#ecf0f1", "#bdc3c7"]}
        />
        <Animated.View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            width: concat(multiply(transition, 100), "%")
          }}
        >
          <LinearGradient
            style={styles.gradient}
            colors={["#3498db", "#2980b9"]}
          />
        </Animated.View>
      </View>
      <ReText style={styles.label} text={total} />
    </View>
  );
};
