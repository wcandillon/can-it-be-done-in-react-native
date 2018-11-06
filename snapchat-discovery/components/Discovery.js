// @flow
import * as React from "react";
import { View } from "react-native";
import type { ImageSourcePropType } from "react-native/Libraries/Image/ImageSourcePropType";

type Story = {
  id: string,
  source: ImageSourcePropType,
  user: string,
  avatar: ImageSourcePropType,
};

type DiscoveryProps = {
  stories: Story[];
};

export default class Discovery extends React.PureComponent<DiscoveryProps> {
  render() {
    const { stories } = this.props;
    return (
      <View />
    );
  }
}
