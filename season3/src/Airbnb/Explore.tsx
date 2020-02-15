import React from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  View
} from "react-native";
import { SharedElement } from "react-navigation-shared-element";
import { useNavigation } from "react-navigation-hooks";

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default () => {
  const { navigate, isFocused } = useNavigation();
  return (
    <View style={styles.container}>
      <SharedElement id="thumbnail">
        <TouchableWithoutFeedback onPress={() => navigate("Listing")}>
          {isFocused && (
            <Image
              style={{ height: 150, width: width - 32 }}
              source={require("./assets/tiny-home.jpg")}
            />
          )}
        </TouchableWithoutFeedback>
      </SharedElement>
    </View>
  );
};
