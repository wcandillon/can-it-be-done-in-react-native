import React, { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Feather as Icon } from "@expo/vector-icons";
import { StyleGuide } from "../components";

const styles = StyleSheet.create({
  container: {
    padding: 16
  },
  mainTitle: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16
  },
  radio: {
    borderWidth: 4,
    borderColor: StyleGuide.palette.primary,
    width: 32,
    height: 32,
    borderRadius: 16
  },
  projectTitle: {
    ...StyleGuide.typography.title1,
    fontWeight: "bold",
    flex: 1,
    marginLeft: 8
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: "#e6e5ea",
    paddingBottom: 8,
    borderBottomWidth: 1
  },
  title: {
    ...StyleGuide.typography.title2,
    fontWeight: "bold",
    color: StyleGuide.palette.primary
  },
  section: {
    marginTop: StyleGuide.spacing * 4,
    marginBottom: StyleGuide.spacing * 2
  },
  todo: {
    flexDirection: "row",
    marginVertical: StyleGuide.spacing,
    alignItems: "center"
  },
  label: {
    ...StyleGuide.typography.body
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#e6e5ea",
    marginRight: 8
  }
});

interface SectionProps {
  title: string;
  children: ReactNode;
}

const Section = ({ title, children }: SectionProps) => (
  <View style={styles.section}>
    <View style={styles.titleContainer}>
      <Text style={styles.title}>{title}</Text>
      <Icon
        name="more-horizontal"
        color={StyleGuide.palette.primary}
        size={24}
      />
    </View>
    {children}
  </View>
);

interface TodoProps {
  label: string;
}

const Todo = ({ label }: TodoProps) => (
  <View style={styles.todo}>
    <View style={styles.checkbox} />
    <Text style={styles.label}>{label}</Text>
  </View>
);

export default () => {
  return (
    <View style={styles.container}>
      <View style={styles.mainTitle}>
        <View style={styles.radio} />
        <Text style={styles.projectTitle}>Meet Things iOS</Text>
      </View>
      <Text>
        This project shows you everything you need to know to hit the ground
        running. Don’t hesitate to play around in it – you can always create a
        new one from settings.
      </Text>
      <Section title="Learn the basics">
        <Todo label="Tap this to-do" />
        <Todo label="Create a new to-do" />
        <Todo label="Put this to-do in Today" />
        <Todo label="Reorder your to-dos" />
        <Todo label="Create a project" />
        <Todo label="You're done!" />
      </Section>
      <Section title="Tune your setup">
        <Todo label="Show your calendar events" />
        <Todo label="Try using Siri with Things" />
        <Todo label="Enable the Action Extension" />
        <Todo label="Enable the Today Widget" />
        <Todo label="Sync your devices" />
      </Section>
      <Section title="Learn the basics">
        <Todo label="Tap this to-do" />
        <Todo label="Create a new to-do" />
        <Todo label="Put this to-do in Today" />
        <Todo label="Reorder your to-dos" />
        <Todo label="Create a project" />
        <Todo label="You're done!" />
      </Section>
      <Section title="Tune your setup">
        <Todo label="Show your calendar events" />
        <Todo label="Try using Siri with Things" />
        <Todo label="Enable the Action Extension" />
        <Todo label="Enable the Today Widget" />
        <Todo label="Sync your devices" />
      </Section>
    </View>
  );
};
