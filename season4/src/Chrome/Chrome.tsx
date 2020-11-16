import React from "react";
import { View } from "react-native";

import Tile, { SIZE } from "./Tile";
import SortableList from "./SortableList";

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
  {
    id: "youtube2",
    uri: "https://youtube.com",
  },
  {
    id: "twitter2",
    uri: "https://twitter.com",
  },
];

const Chrome = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <SortableList
        numberOfColumns={2}
        height={SIZE}
        width={SIZE}
        editing={true}
        onDragEnd={(positions) =>
          console.log(JSON.stringify(positions, null, 2))
        }
      >
        {tiles.map((tile) => (
          <Tile
            onLongPress={() => true}
            key={tile.id}
            id={tile.id}
            uri={tile.uri}
          />
        ))}
      </SortableList>
    </View>
  );
};

export default Chrome;
