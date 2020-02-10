import React from "react";
import { Button, View } from "react-native";
import { SharedElement } from "react-navigation-shared-element";
import { useNavigation } from "react-navigation-hooks";
import { NavigationStackProp } from "react-navigation-stack";

const Note = () => {
  const { pop } = useNavigation() as NavigationStackProp;
  return (
    <View style={{ flex: 1, justifyContent: "flex-end" }}>
      <SharedElement id="thumbnail">
        <View
          style={{
            width: 200,
            height: 200,
            borderRadius: 100,
            backgroundColor: "red"
          }}
        />
      </SharedElement>
      <Button title="Bar" onPress={() => pop()} />
    </View>
  );
};

Note.sharedElements = () => ["thumbnail"];

export default Note;
