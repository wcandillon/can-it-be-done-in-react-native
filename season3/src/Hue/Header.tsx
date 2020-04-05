import React from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
import Animated from "react-native-reanimated";
import { SafeAreaView } from "react-navigation";
import { Feather as Icon } from "@expo/vector-icons";
import { hsv2rgb } from "react-native-redash";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row"
  },
  name: {
    fontSize: 16,
    color: "white"
  }
});

interface ButtonProps {
  name: string;
}

const Button = ({ name }: ButtonProps) => (
  <View>
    <Icon {...{ name }} />
  </View>
);

interface HeaderProps {
  h: Animated.Node<number>;
  s: Animated.Node<number>;
  v: Animated.Node<number>;
}

export default ({ h, s, v }: HeaderProps) => {
  const backgroundColor = hsv2rgb(h, s, v);
  return (
    <Animated.View style={{ backgroundColor }}>
      <SafeAreaView style={styles.container}>
        <View>
          <Button name="arrow-left" />
          <Text style={styles.name}>Living Room</Text>
        </View>
        <View>
          <Button name="more-horizontal" />
          <Switch />
        </View>
      </SafeAreaView>
    </Animated.View>
  );
};
