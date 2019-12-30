import albums from "./albums.json";
import heartsWereGold from "./albums/hearts-were-gold.json";
import brother from "./albums/brother.json";
import whereWeWere from "./albums/where-we-were.json";
import ribbons from "./albums/ribbons.json";
import doSomethingBeautiful from "./albums/do-something-beautiful.json";
import goGetGone from "./albums/go-get-gone.json";
import inColour from "./albums/in-colour.json";
import mountains from "./albums/mountains.json";
import pyk from "./albums/pyk.json";
import melodrama from "./albums/melodrama.json";
import ibnRlLeil from "./albums/ibn-el-leil.json";
import shakira from "./albums/shakira.json";

interface Picture {
  uri: string;
  preview: string;
}

interface Track {
  name: string;
  uri: string;
}

interface Album {
  id: string;
  name: string;
  artist: string;
  picture: Picture;
}

export interface PlaylistEntry {
  album: Album;
  track: Track;
}

interface Playlist {
  id: string;
  name: string;
  entries: PlaylistEntry[];
}

const tracks: { [album: string]: Track[] } = {
  "hearts-were-gold": heartsWereGold,
  brother,
  "where-we-were": whereWeWere,
  ribbons,
  "do-something-beautiful": doSomethingBeautiful,
  "go-get-gone": goGetGone,
  "in-colour": inColour,
  mountains,
  pyk,
  melodrama,
  "ibn-el-leil": ibnRlLeil,
  shakira
};

const entry = (albumId: string, trackName: string): PlaylistEntry => ({
  album: albums.find(album => album.id === albumId) as Album,
  track: tracks[albumId].find(track => track.name === trackName) as Track
});

const playlists: Playlist[] = [
  {
    id: "todays-hits",
    name: "Today's Hits",
    entries: [
      entry("melodrama", "Green Light"),
      entry("ibn-el-leil", "Roman"),
      entry("shakira", "Dare (La La La)"),
      entry("in-colour", "Loud Places (feat. Romy)"),
      entry("do-something-beautiful", "Do Something Beautiful"),
      entry("pyk", "Bones")
    ]
  },
  {
    id: "little-victories",
    name: "Little Victories",
    entries: [
      entry("do-something-beautiful", "Do Something Beautiful"),
      entry("go-get-gone", "Endless Road"),
      entry("where-we-were", "Cell Dilution"),
      entry("hearts-were-gold", "Hearts Were Gold"),
      entry("melodrama", "Green Light"),
      entry("shakira", "Dare (La La La)")
    ]
  }
];

export interface PlayerParams {
  entries: PlaylistEntry[];
  selected: number;
}

export default {
  albums,
  tracks: (album: string) => tracks[album],
  playlists,
  transformAlbumToPlaylist: (album: Album): Playlist => ({
    id: album.id,
    name: album.name,
    entries: tracks[album.id].map(track => ({ album, track }))
  })
};
