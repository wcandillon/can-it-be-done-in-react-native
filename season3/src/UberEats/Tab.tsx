import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const styles = StyleSheet.create({
  container: {
    height: 45,
    paddingHorizontal: 8,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 24,
    marginRight: 8
  },
  text: {
    fontSize: 14,
    fontFamily: "UberMoveRegular"
  }
});

interface TabProps {
  color: string;
  backgroundColor: string;
  name: string;
  onMeasurement?: (measurement: number) => void;
  onPress?: () => void;
}

export default ({
  name,
  color,
  onMeasurement,
  backgroundColor,
  onPress
}: TabProps) => {
  return (
    <TouchableWithoutFeedback {...{ onPress }}>
      <View
        onLayout={
          onMeasurement
            ? ({
                nativeEvent: {
                  layout: { width }
                }
              }) => onMeasurement(width)
            : undefined
        }
        style={[styles.container, { backgroundColor }]}
      >
        <Text style={[styles.text, { color }]}>{name}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};
