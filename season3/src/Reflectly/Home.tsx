import React from "react";
import { Button, View } from "react-native";
import { SharedElement } from "react-navigation-shared-element";
import { useNavigation } from "react-navigation-hooks";

const Home = () => {
  const { navigate } = useNavigation();
  return (
    <View style={{ flex: 1 }}>
      <SharedElement id="thumbnail">
        <View
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: "red"
          }}
        />
      </SharedElement>
      <Button title="GO" onPress={() => navigate("Note")} />
    </View>
  );
};

Home.sharedElements = () => ["thumbnail"];

export default Home;
