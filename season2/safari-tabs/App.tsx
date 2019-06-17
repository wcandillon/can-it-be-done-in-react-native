import React from "react";

import LoadAssets from "./components/LoadAssets";
import Tabs, { ITabs } from "./components/Tabs";

const tabs: ITabs = [
  { id: "apple", screen: require("./assets/screens/apple.jpeg") }
];

export default () => (
  <LoadAssets assets={tabs.map(({ screen }) => screen)}>
    <Tabs {...{ tabs }} />
  </LoadAssets>
);
