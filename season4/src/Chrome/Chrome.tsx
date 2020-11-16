import React, { useState } from "react";
import { View, StyleSheet } from "react-native";

import Tile, { SIZE } from "./Tile";

const tiles = [
  {
    id: "google",
    uri: "https://google.com",
  },
  {
    id: "expo",
    uri: "https://expo.io",
  },
  {
    id: "facebook",
    uri: "https://facebook.com",
  },
  {
    id: "reanimated",
    uri: "https://docs.swmansion.com/react-native-reanimated/",
  },
  {
    id: "github",
    uri: "https://github.com",
  },
  {
    id: "rnnavigation",
    uri: "https://reactnavigation.org/",
  },
  {
    id: "youtube",
    uri: "https://youtube.com",
  },
  {
    id: "twitter",
    uri: "https://twitter.com",
  },
];

const App = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-row",
        flexWrap: "wrap",
        backgroundColor: "black",
        padding: 8,
      }}
    >
      {tiles.map((tile) => (
        <Tile
          onLongPress={() => true}
          key={tile.id}
          id={tile.id}
          uri={tile.uri}
        />
      ))}
    </View>
  );
};

export default App;
