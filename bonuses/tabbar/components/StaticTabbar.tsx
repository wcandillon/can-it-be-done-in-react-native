import * as React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Feather as Icon } from "@expo/vector-icons";

interface Tab {
  name: string;
}

interface StaticTabbarProps {
  tabs: Tab[];
  index: number;
  onChange: (prev: number, index: number) => void;
}

export default class StaticTabbar extends React.PureComponent<StaticTabbarProps> {
  render() {
    const { tabs, onChange, index } = this.props;
    return (
      <View style={styles.container}>
        {
          tabs.map((tab, key) => (
            <TouchableWithoutFeedback onPress={() => onChange(index, key)} {...{ key }}>
              <View style={styles.tab}>
                {

                  key !== index && (
                    <Icon name={tab.name} color="black" size={25} />)
                }
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
