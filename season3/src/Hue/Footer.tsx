import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-navigation";
import { Entypo as Icon } from "@expo/vector-icons";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#232425",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  tab: {
    margin: 16,
    alignItems: "center",
  },
});

const tabs = [
  {
    icon: "home",
    label: "Home",
  },
  {
    icon: "clock",
    label: "Routines",
  },
  {
    icon: "rocket",
    label: "Explore",
  },
  {
    icon: "cog",
    label: "Settings",
  },
];

interface TabProps {
  icon: string;
  label: string;
  active?: boolean;
}

const Tab = ({ icon, label, active }: TabProps) => {
  const color = active ? "white" : "#525354";
  return (
    <View style={styles.tab}>
      <Icon name={icon} size={24} {...{ color }} />
      <Text style={{ color }}>{label}</Text>
    </View>
  );
};

export default () => {
  return (
    <SafeAreaView style={styles.container}>
      {tabs.map((tab) => (
        <Tab active={tab.icon === "home"} key={tab.icon} {...tab} />
      ))}
    </SafeAreaView>
  );
};
