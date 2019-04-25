import * as React from "react";
import { View, ImageSourcePropType } from "react-native";

export interface App {
  id: string;
  title: string;
  subtitle: string;
  background: ImageSourcePropType;
  content: string;
}

export type Apps = App[];

interface AppProps {
  app: App;
}

export default class App extends React.PureComponent<AppProps> {
  render() {
    return (
      <View />
    );
  }
}
