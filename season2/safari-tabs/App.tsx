import React from "react";

import LoadAssets from "./components/LoadAssets";
import Tabs, { ITabs } from "./components/Tabs";

const tabs: ITabs = [
  { id: "screen1", screen: require("./assets/screens/screen1.jpeg") },
  { id: "screen2", screen: require("./assets/screens/screen2.jpeg") },
  { id: "screen3", screen: require("./assets/screens/screen3.jpeg") }
];

export default () => (
  <LoadAssets assets={tabs.map(({ screen }) => screen)}>
    <Tabs {...{ tabs }} />
  </LoadAssets>
);
