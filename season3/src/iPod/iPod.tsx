import * as React from "react";

import createIPodNavigator, { InjectedIPodProps } from "./IPodNavigator";
import List from "./List";
import data from "./data";

const Menu = ({ y, command }: InjectedIPodProps) => (
  <List
    items={[
      { icon: "play", label: "Now Playing", screen: "NowPlaying" },
      { icon: "list", label: "Playlists", screen: "Playlists" },
      { icon: "layers", label: "Albums", screen: "Albums" },
      { icon: "users", label: "Artists", screen: "Artists" },
      { icon: "music", label: "Songs", screen: "Songs" },
      { icon: "shuffle", label: "Shuffle", screen: "Shuffle" },
      { icon: "settings", label: "Settings", screen: "Settings" }
    ]}
    {...{ y, command }}
  />
);

const Albums = ({ y, command }: InjectedIPodProps) => (
  <List
    items={data.albums.map(album => ({
      screen: "Album",
      icon: "music",
      label: album.name
    }))}
    {...{ y, command }}
  />
);

export default createIPodNavigator({
  Menu: {
    screen: Menu
  },
  Albums: {
    screen: Albums
  }
});
