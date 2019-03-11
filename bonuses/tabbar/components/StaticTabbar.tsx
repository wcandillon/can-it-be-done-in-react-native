import * as React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Feather as Icon } from "@expo/vector-icons";

interface Tab {
  name: string;
}

interface StaticTabbarProps {
  tabs: Tab[];
}

export default class StaticTabbar extends React.PureComponent<StaticTabbarProps> {
  render() {
    const { tabs } = this.props;
    return (
      <View style={styles.container}>
        {
          tabs.map((tab, key) => (
            <TouchableWithoutFeedback {...{ key }}>
              <View style={styles.tab}>
                <Icon name={tab.name} color="black" size={25} />
              </View>
            </TouchableWithoutFeedback>
          ))
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  tab: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 64,
  },
});
