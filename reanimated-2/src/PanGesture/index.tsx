import React, { useState } from "react";
import { StyleSheet, View, LayoutRectangle } from "react-native";

import PanGesture from "./PanGesture";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const Pan = () => {
  const [container, setContainer] = useState<null | LayoutRectangle>(null);
  return (
    <View
      style={styles.container}
      onLayout={({ nativeEvent: { layout } }) => setContainer(layout)}
    >
      {container && <PanGesture {...container} />}
    </View>
  );
};

export default Pan;
