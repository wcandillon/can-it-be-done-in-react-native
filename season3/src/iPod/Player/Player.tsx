import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";
import { Audio } from "expo-av";
import { Sound } from "expo-av/build/Audio";

import { Command, useOnPress } from "../ClickWheel";
import { PlayerParams, TrackWithInfo } from "../data";
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
  const [track, setTrack] = useState<TrackWithInfo | null>(null);
  const { tracks, selected } = useParams<PlayerParams>();
  useEffect(() => {
    setTrack(tracks[selected]);
  }, [selected, tracks]);
  useEffect(() => {
    (async () => {
      if (track) {
        playback.current = (
          await Audio.Sound.createAsync(
            { uri: track.uri },
            { shouldPlay: true }
          )
        ).sound;
      }
    })();
  }, [track]);
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
  console.log({ track });
  if (!track) {
    return null;
  }
  return (
    <View style={styles.container}>
      <Image source={track.cover.uri} style={{ width: 100, height: 100 }} />
    </View>
  );
};
