const albums = require("./albums");
const heartsWereGold = require("./albums/hearts-were-gold");
const brother = require("./albums/brother");
const whereWeWere = require("./albums/where-we-were");
const ribbons = require("./albums/ribbons");
const doSomethingBeautiful = require("./albums/do-something-beautiful");
const goGetGone = require("./albums/go-get-gone");
const inColour = require("./albums/in-colour");
const mountains = require("./albums/mountains");
const pyk = require("./albums/pyk");
const melodrama = require("./albums/melodrama");
const ibnRlLeil = require("./albums/ibn-el-leil");
const shakira = require("./albums/shakira");

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

interface PlaylistEntry {
  album: Album;
  track: Track;
}

interface Playlist {
  id: string;
  name: string;
  entries: PlaylistEntry[];
}

interface Music {
  albums: Album[];
  tracks: (id: string) => Track[];
  playlists: Playlist[];
  transformAlbumToPlaylist: (album: Album) => Playlist;
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
  album: albums.find(album => album.id === albumId),
  track: tracks[albumId].find(track => track.name === trackName)
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
