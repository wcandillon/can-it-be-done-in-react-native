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
//       <WebView source={{ uri }} style={{ flex: 1, margin: 8 }} />

const Tile = ({ uri }: TileProps) => {
  return (
    <View style={styles.container} pointerEvents="none">
      <View style={{ flex: 1, margin: 8, backgroundColor: "#00a0ff" }} />
    </View>
  );
};

export default Tile;
