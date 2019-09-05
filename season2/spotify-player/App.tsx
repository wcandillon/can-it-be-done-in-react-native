import React from "react";
import { StatusBar } from "react-native";

import Album from "./components/Album";
import BottomTab from "./components/BottomTab";
import LoadAssets from "./components/LoadAssets";

export default function App() {
  return (
    <LoadAssets assets={[require("./assets/Jan-Blomqvist.jpg")]}>
      <StatusBar barStyle="light-content" />
      <Album />
      <BottomTab />
    </LoadAssets>
  );
}
