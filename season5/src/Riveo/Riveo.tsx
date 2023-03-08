/* eslint-disable @typescript-eslint/no-var-requires */
import { useFont } from "@shopify/react-native-skia";
import React from "react";

import { Background } from "./Background";
import { Project } from "./Project";

const boldTf = require("./assets/Roboto-Bold.ttf");
const regularTf = require("./assets/Roboto-Regular.ttf");

const projects: Project[] = [
  {
    id: "zurich",
    title: "Zürich",
    size: "45MB",
    duration: "1:06m",
    picture: require("./assets/zurich2.jpg"),
    color: "#BDA098",
  },
  {
    id: "oslo",
    title: "Oslo",
    size: "1GB",
    duration: "5:02m",
    picture: require("./assets/oslo2.jpg"),
    color: "#59659a",
  },
  {
    id: "krakow",
    title: "Kraków",
    size: "500MB",
    duration: "11:04m",
    picture: require("./assets/krakow.jpg"),
    color: "#BAB9B0",
  },
];

export const Riveo = () => {
  const titleFont = useFont(boldTf, 36);
  const normalFont = useFont(regularTf, 18);
  if (!titleFont || !normalFont) {
    return null;
  }
  return (
    <Background>
      {projects.map((project, index) => {
        return (
          <Project
            key={index}
            font={titleFont}
            smallFont={normalFont}
            project={project}
          />
        );
      })}
    </Background>
  );
};
