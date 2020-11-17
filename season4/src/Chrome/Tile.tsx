import React from "react";
import { StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";

import { MARGIN, SIZE } from "./Config";

const styles = StyleSheet.create({
  container: {
    width: SIZE,
    height: SIZE,
  },
});
interface TileProps {
  id: string;
  uri: string;
  onLongPress: () => void;
}

const Tile = ({ uri }: TileProps) => {
  return (
    <View style={styles.container} pointerEvents="none">
      <WebView
        source={{ uri }}
        style={{ flex: 1, margin: MARGIN * 2, borderRadius: MARGIN }}
      />
    </View>
  );
};

export default Tile;
