import { NavigationProp, RouteProp } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Dimensions, View, Image } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import { Video } from "expo-av";

import { SnapchatRoutes } from "./Model";

interface StoryProps {
  navigation: NavigationProp<SnapchatRoutes, "Story">;
  route: RouteProp<SnapchatRoutes, "Story">;
}

const { height } = Dimensions.get("window");

const Story = ({ route, navigation }: StoryProps) => {
  const { story } = route.params;
  return (
    <View style={[{ flex: 1 }]}>
      {!story.video && (
        <Image
          source={story.source}
          style={[
            {
              ...StyleSheet.absoluteFillObject,
              width: undefined,
              height: undefined,
            },
          ]}
        />
      )}
      {story.video && (
        <Video
          source={story.video}
          rate={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay
          isLooping
          style={[StyleSheet.absoluteFill]}
        />
      )}
    </View>
  );
};

export default Story;
