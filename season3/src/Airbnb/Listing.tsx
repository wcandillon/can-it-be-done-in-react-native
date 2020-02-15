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
    flex: 1
  }
});

export default () => {
  const { navigate } = useNavigation();
  return (
    <View style={styles.container}>
      <SharedElement id="thumbnail">
        <Image
          style={{ height: width, width }}
          source={require("./assets/tiny-home.jpg")}
        />
      </SharedElement>
    </View>
  );
};
