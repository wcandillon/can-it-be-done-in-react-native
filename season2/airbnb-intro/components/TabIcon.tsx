import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Feather as Icon } from "@expo/vector-icons";

import StyleGuide from "./StyleGuide";

interface TabIconProps {
  label: string;
  icon: string;
  active?: boolean;
}

export default class TabIcon extends React.PureComponent<TabIconProps> {
  static defaultProps = {
    active: false,
  };

  render() {
    const { label, icon, active } = this.props;
    const color = active ? "#f7555c" : "black";
    return (
      <View style={styles.container}>
        <Icon name={icon} {...{ color }} size={25} />
        <Text style={[styles.label, { color }]}>{label.toUpperCase()}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    ...StyleGuide.typography.micro,
    marginTop: StyleGuide.spacing.tiny,
  },
});
