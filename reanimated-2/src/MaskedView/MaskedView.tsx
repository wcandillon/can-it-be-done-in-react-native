import React from "react";
import { View, StyleSheet, Dimensions, Image } from "react-native";
import RNMaskedView from "@react-native-community/masked-view";
import Animated from "react-native-reanimated";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  picture: {
    width,
    height: width,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
  },
});

const MaskedView = () => {
  return (
    <View style={styles.container}>
      <RNMaskedView
        style={styles.picture}
        maskElement={
          <Animated.View
            style={{
              ...StyleSheet.absoluteFillObject,
              backgroundColor: "black",
              width: undefined,
              height: undefined,
              transform: [{ scale: 2 }],
              borderRadius: width / 2,
            }}
          />
        }
      >
        <Image
          source={require("./assets/blue.png")}
          style={styles.background}
        />
      </RNMaskedView>
    </View>
  );
};

export default MaskedView;
