import * as React from "react";

import createIPodNavigator, { InjectedIPodProps } from "./IPodNavigator";
import List from "./List";
import data from "./data";

const Menu = ({ y }: InjectedIPodProps) => (
  <List
    items={[
      { icon: "play", label: "Now Playing" },
      { icon: "list", label: "Playlists" },
      { icon: "layers", label: "Albums" },
      { icon: "users", label: "Users" },
      { icon: "music", label: "Songs" },
      { icon: "shuffle", label: "Shuffle" },
      { icon: "settings", label: "Settings" }
    ]}
    {...{ y }}
  />
);

export default createIPodNavigator({
  Menu: {
    screen: Menu
  }
});
