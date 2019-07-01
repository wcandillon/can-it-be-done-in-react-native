import React from "react";

import Tabs from "./components/Tabs";
import { TabsModel } from "./components/Model";

const tabs: TabsModel = [
  {
    id: "Facebook",
    uri: "https://facebook.github.io/react-native"
  },
  { id: "Expo", uri: "https://expo.io" },
  { id: "Apple", uri: "https://www.apple.com/" },
  {
    id: "Start React Native",
    uri: "https://react-native.shop/buy-me-a-coffee"
  },
  { id: "Google", uri: "https://www.google.com/" }
];

export default () => <Tabs {...{ tabs }} />;
