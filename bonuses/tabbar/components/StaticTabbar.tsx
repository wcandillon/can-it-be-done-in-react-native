import * as React from "react";
import {
  View, StyleSheet, TouchableWithoutFeedback, Animated, Dimensions,
} from "react-native";
import { Feather as Icon } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

interface Tab {
  name: string;
}

interface StaticTabbarProps {
  tabs: Tab[];
  value: Animated.Value;
}

export default class StaticTabbar extends React.PureComponent<StaticTabbarProps> {
  onPress = (index: number) => {
    const { value, tabs } = this.props;
    Animated.timing(value, {
      toValue: (width / tabs.length) * index,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }

  render() {
    const { onPress } = this;
    const { tabs } = this.props;
    return (
      <View style={styles.container}>
        {
          tabs.map((tab, key) => (
            <TouchableWithoutFeedback onPress={() => onPress(key)} {...{ key }}>
              <View style={styles.tab}>
                {

                  <Icon name={tab.name} color="black" size={25} />
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
