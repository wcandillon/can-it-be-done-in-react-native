import React, { useEffect, useState } from "react";
import { Image, ImageStyle, View } from "react-native";
import * as FileSystem from "expo-file-system";
import SHA1 from "crypto-js/sha1";

interface ImageProps {
  source: string;
  style: ImageStyle;
}

const BASE_DIR = `${FileSystem.cacheDirectory}expo-image-cache/`;
const getCacheEntry = async (uri: string): Promise<string> => {
  const filename = uri.substring(
    uri.lastIndexOf("/"),
    uri.indexOf("?") === -1 ? uri.length : uri.indexOf("?")
  );
  const ext =
    filename.indexOf(".") === -1
      ? ".jpg"
      : filename.substring(filename.lastIndexOf("."));
  const path = `${BASE_DIR}${SHA1(uri)}${ext}`;
  // TODO: maybe we don't have to do this every time
  try {
    await FileSystem.makeDirectoryAsync(BASE_DIR);
  } catch (e) {
    // do nothing
  }
  const info = await FileSystem.getInfoAsync(path);
  const { exists } = info;
  if (!exists) {
    await FileSystem.downloadAsync(uri, path);
  }
  return path;
};

export default ({ source, style }: ImageProps) => {
  const [uri, setURI] = useState<null | string>(null);
  useEffect(() => {
    (async () => {
      const u = await getCacheEntry(source);
      setURI(u);
    })();
  }, [source]);
  if (!uri) {
    return <View {...{ style }} />;
  }
  return <Image source={{ uri }} {...{ style }} />;
};
