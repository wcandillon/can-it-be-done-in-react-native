import React from 'react';
import Channels from "./components/Channels";

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
  {},
]

export default function App() {
  return (
    <Channels {...{channels}} />
  );
}
