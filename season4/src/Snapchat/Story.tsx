import { RouteProp } from "@react-navigation/native";
import React from "react";
import { Image, StyleSheet } from "react-native";
import { SharedElement } from "react-navigation-shared-element";

import { SnapchatRoutes } from "./Model";

interface StoryProps {
  route: RouteProp<SnapchatRoutes, "Story">;
}

const Story = ({ route }: StoryProps) => {
  const { story } = route.params;
  return (
    <SharedElement id={story.id} style={{ flex: 1 }}>
      <Image
        source={story.source}
        style={{
          ...StyleSheet.absoluteFillObject,
          width: undefined,
          height: undefined,
        }}
      />
    </SharedElement>
  );
};

export default Story;
