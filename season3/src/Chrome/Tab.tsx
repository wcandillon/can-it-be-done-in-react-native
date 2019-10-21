import React from "react";
import { View } from "react-native";

interface Tab {
  id: number;
  name: string;
  uri: string;
}

export const tabs: Tab[] = [
  {
    id: 1,
    name: "Facebook",
    uri: "https://facebook.github.io/react-native"
  },
  {
    id: 2,
    name: "Expo",
    uri: "https://expo.io"
  },
  {
    id: 3,
    name: "Apple",
    uri: "https://www.apple.com/"
  },
  {
    id: 4,
    name: "Start React Native",
    uri: "https://react-native.shop/buy-me-a-coffee"
  },
  {
    id: 5,
    name: "Google",
    uri: "https://www.google.com/"
  }
];

export interface TabProps {
  tab: Tab;
}

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export default (tab: TabProps) => {
  const backgroundColor = getRandomColor();
  return <View style={{ width: 100, height: 100, backgroundColor }} />;
};
