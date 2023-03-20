/* eslint-disable max-len */
import { fitbox, Group, Path, rect } from "@shopify/react-native-skia";
import React from "react";
import { useWindowDimensions } from "react-native";

// viewBox="0 0 345 1344"
const src = rect(0, 0, 345, 1344);
const aspectRatio = src.width / src.height;
export const Silo = () => {
  const { width, height } = useWindowDimensions();
  const w = 150;
  const dst = rect(width * 0.25, 50, w, w / aspectRatio);
  return (
    <Group transform={fitbox("contain", src, dst)}>
      <Path path="M238.689.772H.021V1034.57h238.668V.772Z" color="#86A3B2" />
      <Path
        path="M216.49 19.773h-22.177v36.175h22.177V19.773ZM179.306 19.773h-22.177v36.175h22.177V19.773ZM142.122 19.773h-22.177v36.175h22.177V19.773ZM104.96 19.773H82.783v36.175h22.177V19.773ZM67.776 19.773H45.6v36.175h22.177V19.773ZM29.004 19.773H6.826v36.175h22.178V19.773Z"
        color="#1D4D68"
      />
      <Path
        path="M187.121.772v748.369M149.035.772v748.369M110.95.772v748.369M72.886.772v748.369M34.8.772v748.369"
        style="stroke"
        color="#607F89"
        strokeMiter={10}
      />
      <Path
        path="M249.466 753.134H.021v281.436h249.445V753.134Z"
        color="#7A99A5"
      />
      <Path path="M48.39 809.898h-7.6v224.672h7.6V809.898Z" color="#A9CAD8" />
      <Path
        path="m48.39 809.898 34.393 67.564v157.108H48.39V809.898Z"
        color="#607F89"
      />
      <Path path="M90.383 809.898h-7.6v224.672h7.6V809.898Z" color="#A9CAD8" />
      <Path
        path="m90.361 809.898 34.393 67.564v157.108H90.361V809.898Z"
        color="#607F89"
      />
      <Path path="M132.354 809.898h-7.6v224.672h7.6V809.898Z" color="#A9CAD8" />
      <Path
        path="m132.354 809.898 34.371 67.564v157.108h-34.371V809.898Z"
        color="#607F89"
      />
      <Path path="M174.326 809.898h-7.6v224.672h7.6V809.898Z" color="#A9CAD8" />
      <Path
        path="m174.326 809.898 34.371 67.564v157.108h-34.371V809.898Z"
        color="#607F89"
      />
      <Path path="M216.297 809.898h-7.6v224.672h7.6V809.898Z" color="#A9CAD8" />
      <Path
        path="m216.297 809.898 34.371 67.564v157.108h-34.371V809.898Z"
        color="#607F89"
      />
      <Path
        path="m238.689.772 32.375 63.162v970.636h-20.396V753.134h-11.979V.772Z"
        color="#A9CAD8"
      />
      <Path
        path="M271.064 1034.57h51.331v146.55h21.92v162.24H.021v-308.79h271.043Z"
        color="#607F89"
      />
      <Path
        path="M322.395 1034.57v308.79H191.522v-308.79h130.873Z"
        color="#6C8E96"
      />
    </Group>
  );
};
