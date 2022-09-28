import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import Icon from "@expo/vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { SharedValue } from "react-native-reanimated";
import { withSpring } from "react-native-reanimated";

const { height: wHeight } = Dimensions.get("window");

interface PlayerControlsProps {
  title: string;
  height: SharedValue<number>;
}

export const PlayerControls = ({ title, height }: PlayerControlsProps) => {
  const navigate = useNavigation();
  const { top } = useSafeAreaInsets();
  const start = wHeight - top;
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        height.value = withSpring(start, {
          overshootClamping: true,
        });
      }}
    >
      <View style={styles.container}>
        <View style={styles.placeholder} />
        <Text style={styles.title} numberOfLines={3}>
          {title}
        </Text>
        <Icon style={styles.icon} name="play" />
        <TouchableWithoutFeedback onPress={() => navigate.goBack()}>
          <Icon style={styles.icon} name="x" />
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  title: {
    flex: 1,
    flexWrap: "wrap",
    paddingLeft: 8,
  },
  placeholder: {},
  icon: {
    fontSize: 24,
    color: "gray",
    padding: 8,
  },
});
