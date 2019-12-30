import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";
import { Audio } from "expo-av";
import { Sound } from "expo-av/build/Audio";

import { Command, useOnPress } from "../ClickWheel";
import { PlayerParams, PlaylistEntry } from "../data";
import { useParams } from "../IPodNavigator";
import Image from "../Image";

interface PlayerProps {
  command: Animated.Node<Command>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default ({ command }: PlayerProps) => {
  const playback = useRef<Sound>();
  const [entry, setEntry] = useState<PlaylistEntry | null>(null);
  const { entries, selected } = useParams<PlayerParams>();
  useEffect(() => {
    setEntry(entries[selected]);
  }, [entries, selected]);
  useEffect(() => {
    (async () => {
      if (entry) {
        playback.current = (
          await Audio.Sound.createAsync(
            { uri: entry.track.uri },
            { shouldPlay: true }
          )
        ).sound;
      }
    })();
  }, [entry]);
  useOnPress(command, Command.BOTTOM, async () => {
    if (playback.current) {
      const status = await playback.current.getStatusAsync();
      if (status.isLoaded) {
        if (status.isPlaying) {
          playback.current.pauseAsync();
        } else {
          playback.current.playAsync();
        }
      }
    }
  });
  useOnPress(command, Command.TOP, navigation => navigation.navigate("Menu"));
  console.log({ entry });
  if (!entry) {
    return null;
  }
  return (
    <View style={styles.container}>
      <Image
        source={entry.album.picture.uri}
        style={{ width: 100, height: 100 }}
      />
    </View>
  );
};
