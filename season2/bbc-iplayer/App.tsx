import React from "react";

import Channels from "./components/Channels";
import { IChannel } from "./components/Model";

const channels: IChannel[] = [
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
