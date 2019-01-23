import * as React from "react";
import { View } from "react-native";

import { Status } from "./Model";

interface MouthProps {
  status: Status
}

export default class Mouth extends React.PureComponent<MouthProps> {
  render() {
    return (
      <View />
    );
  }
}
