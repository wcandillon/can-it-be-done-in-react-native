import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Sound } from "expo-av/build/Audio";
import { ReText, max, useValues, withTransition } from "react-native-redash";
import Animated, {
  block,
  concat,
  cond,
  debug,
  divide,
  eq,
  floor,
  lessThan,
  modulo,
  multiply,
  useCode
} from "react-native-reanimated";
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

const minutes = (v: Animated.Node<number>) => {
  const m1 = floor(divide(v, 1000 * 60));
  const m = cond(eq(m1, -0), 0, m1);
  return cond(lessThan(m, 10), concat("0", m), concat(m));
};

const seconds = (v: Animated.Node<number>) => {
  const s1 = floor(divide(modulo(v, 1000 * 60), 1000));
  const s = cond(eq(s1, -0), 0, s1);
  return cond(lessThan(s, 10), concat("0", s), concat(s));
};

interface ProgressBarProps {
  playback: Sound;
}

export default ({ playback }: ProgressBarProps) => {
  const [position, total] = useValues<number>([0, 0], [playback]);
  useEffect(() => {
    playback.setOnPlaybackStatusUpdate(status => {
      if (status.isLoaded) {
        position.setValue(status.positionMillis);
        total.setValue(status.playableDurationMillis as number);
      }
    });
  }, [playback, position, total]);
  const progress = withTransition(divide(position, total));
  const playedMinutes = minutes(position);
  const playedSeconds = seconds(position);
  const totalMinutes = minutes(total);
  const totalSeconds = seconds(total);
  return (
    <View style={styles.container}>
      <ReText
        style={styles.label}
        text={concat(playedMinutes, ":", playedSeconds)}
      />
      <View style={styles.bar}>
        <LinearGradient
          style={styles.gradient}
          colors={[
            "#D8D8D8",
            "#FDFDFD",
            "#F5F5F5",
            "#F2F2F2",
            "#E2E2E2",
            "#EDEDED"
          ]}
        />
        <Animated.View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            width: concat(multiply(progress, 100), "%")
          }}
        >
          <LinearGradient
            style={styles.gradient}
            colors={[
              "#7491EF",
              "#778DF6",
              "#6787EE",
              "#708EF4",
              "#417CF3",
              "#56B3F9",
              "#4F93D7"
            ]}
          />
        </Animated.View>
      </View>
      <ReText
        style={styles.label}
        text={concat(totalMinutes, ":", totalSeconds)}
      />
    </View>
  );
};
