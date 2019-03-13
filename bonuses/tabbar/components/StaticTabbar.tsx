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
    const tabWidth = width / tabs.length;
    Animated.timing(value, {
      toValue: tabWidth * index,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }

  render() {
    const { onPress } = this;
    const { tabs, value } = this.props;
    return (
      <View style={styles.container}>
        {
          tabs.map((tab, key) => {
            const tabWidth = width / tabs.length;
            const cursor = tabWidth * key;
            const opacity = value.interpolate({
              inputRange: [cursor - tabWidth, cursor, cursor + tabWidth],
              outputRange: [1, 0, 1],
              extrapolate: "clamp",
            });
            const translateY = value.interpolate({
              inputRange: [cursor - tabWidth, cursor, cursor + tabWidth],
              outputRange: [64, 0, 64],
              extrapolate: "clamp",
            });
            return (
              <React.Fragment {...{ key }}>
                <TouchableWithoutFeedback onPress={() => onPress(key)}>
                  <Animated.View style={[styles.tab, { opacity }]}>
                    <Icon name={tab.name} color="black" size={25} />
                  </Animated.View>
                </TouchableWithoutFeedback>
                <Animated.View
                  style={{
                    position: "absolute",
                    top: -8,
                    left: tabWidth * key,
                    width: tabWidth,
                    height: 64,
                    justifyContent: "center",
                    alignItems: "center",
                    transform: [{ translateY }],
                  }}
                >
                  <View style={styles.activeIcon}>
                    <Icon name={tab.name} color="black" size={25} />
                  </View>
                </Animated.View>
              </React.Fragment>
            );
          })
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
  activeIcon: {
    backgroundColor: "white",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
