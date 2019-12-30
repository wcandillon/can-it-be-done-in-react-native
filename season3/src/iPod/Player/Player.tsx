import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated from "react-native-reanimated";
import { Audio } from "expo-av";
import { Sound } from "expo-av/build/Audio";

import ProgressBar from "./ProgressBar";
import { Command, useOnPress } from "../ClickWheel";
import { PlayerParams } from "../data";
import { SCREEN_SIZE, useParams } from "../IPodNavigator";
import Image from "../Image";

interface PlayerProps {
  command: Animated.Value<Command>;
}

Audio.setAudioModeAsync({
  playsInSilentModeIOS: true,
  allowsRecordingIOS: false,
  staysActiveInBackground: false,
  interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
  shouldDuckAndroid: false,
  interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
  playThroughEarpieceAndroid: true
});

const COVER_SIZE = SCREEN_SIZE * 0.5 - 16;
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    flex: 1,
    flexDirection: "row"
  },
  cover: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  metadata: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  track: {
    fontFamily: "Chicago",
    fontSize: 16,
    textAlign: "center"
  },
  artist: {
    fontFamily: "Chicago",
    textAlign: "center"
  }
});

export default ({ command }: PlayerProps) => {
  const [index, setIndex] = useState(0);
  const [playback, setPlayback] = useState<Sound | null>(null);
  const { entries, selected } = useParams<PlayerParams>();
  useEffect(() => {
    setIndex(selected);
  }, [selected]);
  useEffect(() => {
    (async () => {
      const { sound } = await Audio.Sound.createAsync(
        { uri: entries[index].track.uri },
        { shouldPlay: true }
      );
      setPlayback(sound);
    })();
  }, [entries, index]);
  useEffect(
    () => () => {
      (async () => {
        if (playback) {
          await playback.unloadAsync();
        }
      })();
    },
    [playback]
  );
  useOnPress(command, Command.BOTTOM, async () => {
    if (playback) {
      const status = await playback.getStatusAsync();
      if (status.isLoaded) {
        if (status.isPlaying) {
          playback.pauseAsync();
        } else {
          playback.playAsync();
        }
      }
    }
  });
  useOnPress(command, Command.TOP, async navigation => {
    if (playback) {
      await playback.unloadAsync();
    }
    navigation.navigate("Menu");
  });
  useOnPress(command, Command.LEFT, async () => {
    if (playback) {
      await playback.unloadAsync();
    }
    setIndex(entries[index - 1] ? index - 1 : 0);
  });
  useOnPress(command, Command.RIGHT, async () => {
    if (playback) {
      await playback.unloadAsync();
    }
    setIndex(entries[index + 1] ? index + 1 : index);
  });
  useOnPress(command, Command.TOP, async navigation => {
    if (playback) {
      await playback.unloadAsync();
    }
    navigation.navigate("Menu");
  });
  if (!playback) {
    return null;
  }
  const entry = entries[index];
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.cover}>
          <Image
            source={entry.album.picture.uri}
            style={{ width: COVER_SIZE, height: COVER_SIZE }}
          />
        </View>
        <View style={styles.metadata}>
          <Text style={styles.track}>{entry.track.name}</Text>
          <Text style={styles.artist}>{entry.album.artist}</Text>
        </View>
      </View>
      <ProgressBar {...{ playback }} />
    </View>
  );
};
