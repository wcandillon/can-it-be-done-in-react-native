import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";

const { width } = Dimensions.get("window");
export const SIZE = width / 2;
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
      <WebView source={{ uri }} style={{ flex: 1, margin: 8 }} />
    </View>
  );
};

export default Tile;
