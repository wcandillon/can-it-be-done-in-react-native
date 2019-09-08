import React, { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Feather as Icon } from "@expo/vector-icons";
import { StyleGuide } from "../components";

const styles = StyleSheet.create({
  container: {
    padding: 16
  },
  projectTitle: {
    ...StyleGuide.typography.title1,
    fontWeight: "bold"
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  title: {
    ...StyleGuide.typography.title2,
    fontWeight: "bold"
  },
  section: {
    marginTop: StyleGuide.spacing * 4,
    marginBottom: StyleGuide.spacing * 2
  },
  todo: {
    marginVertical: StyleGuide.spacing * 2
  },
  label: {
    ...StyleGuide.typography.body
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
      <Icon name="more-horizontal" color={StyleGuide.palette.primary} />
    </View>
    {children}
  </View>
);

interface TodoProps {
  label: string;
}

const Todo = ({ label }: TodoProps) => (
  <View style={styles.todo}>
    <Text style={styles.label}>{label}</Text>
  </View>
);

export default () => {
  return (
    <View style={styles.container}>
      <Text style={styles.projectTitle}>Meet Things iOS</Text>
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
    </View>
  );
};
