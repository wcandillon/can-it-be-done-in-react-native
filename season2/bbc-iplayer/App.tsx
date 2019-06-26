import React from "react";

import Channels from "./components/Channels";
import { Channel } from "./components/Model";

const channels: Channel[] = [
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {}
];

export default function App() {
  return <Channels {...{ channels }} />;
}
