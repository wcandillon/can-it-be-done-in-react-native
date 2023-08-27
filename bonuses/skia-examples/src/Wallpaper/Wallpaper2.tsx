import {
  Canvas,
  Fill,
  LinearGradient,
  vec,
  Path,
  Skia,
  SweepGradient,
} from "@shopify/react-native-skia";
import React from "react";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const center = vec(width / 2, height / 2);
const halfCircle = Skia.Path.Make();
halfCircle.addCircle(center.x, center.y, width / 2);
halfCircle.trim(0.5, 1, false);

export const Wallpaper = () => {
  return (
    <Canvas style={{ flex: 1 }}>
      <Fill>
        <LinearGradient
          start={vec(0, 0)}
          end={vec(width, height)}
          colors={["#013158", "#016579", "#016579", "#013158"]}
        />
      </Fill>
      <Path
        path={halfCircle}
        transform={[{ rotate: Math.PI / 6 }, { translateX: -width / 4 }]}
        origin={center}
      >
        <SweepGradient
          c={center}
          transform={[
            { scaleY: -1 },
            { translateX: width / 4 },
            { rotate: -Math.PI / 6 },
          ]}
          origin={center}
          start={0}
          end={180}
          colors={["#000423", "#0C88B6", "#1DF7BC", "#D4FDAE"]}
        />
      </Path>
      <Path
        path={halfCircle}
        color="white"
        transform={[
          { rotate: Math.PI / 6 },
          { translateX: width / 4 },
          { scaleY: -1 },
        ]}
        origin={center}
      >
        <SweepGradient
          c={center}
          transform={[{ translateX: -width / 4 }, { rotate: Math.PI / 6 }]}
          origin={center}
          start={180}
          end={360}
          colors={["#043648", "#0C88B6", "#0C88B6", "#F592C7", "#F592C7"]}
        />
      </Path>
    </Canvas>
  );
};
