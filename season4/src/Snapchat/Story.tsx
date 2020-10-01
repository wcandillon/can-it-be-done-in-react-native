import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { SharedElement } from "react-navigation-shared-element";

const Story = ({ route }) => {
  const { story } = route.params;
  return (
    <View style={{ flex: 1 }}>
      <Image
        source={story.source}
        style={{
          ...StyleSheet.absoluteFillObject,
          width: undefined,
          height: undefined,
        }}
      />
    </View>
  );
};

export default Story;
