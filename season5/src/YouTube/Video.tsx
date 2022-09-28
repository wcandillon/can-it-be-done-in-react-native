import type { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { View } from "react-native";

import type { Video as VideoModel } from "./Videos";

export const Video = ({
  route,
}: StackScreenProps<{ Video: { video: VideoModel } }>) => {
  const { video } = route.params;
  console.log({ video });
  return <View style={{ flex: 1, backgroundColor: "cyan" }} />;
};
