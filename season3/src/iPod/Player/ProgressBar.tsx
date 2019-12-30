import React, { useEffect } from "react";
import { View } from "react-native";
import { Sound } from "expo-av/build/Audio";

interface ProgressBarProps {
  playback: Sound;
}

export default ({ playback }: ProgressBarProps) => {
  useEffect(() => {
    playback.setOnPlaybackStatusUpdate(status => console.log({ status }));
  }, [playback]);
  return <View />;
};
