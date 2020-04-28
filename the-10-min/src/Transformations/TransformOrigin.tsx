import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  Value,
  add,
  call,
  cos,
  divide,
  interpolate,
  multiply,
  set,
  sin,
  sub,
  useCode,
} from "react-native-reanimated";
import { loop, mix, translateZ as tz } from "react-native-redash";
import {
  decompose2d,
  multiply4,
  multiply4x3,
  processTransform,
} from "./Matrix";
import processTransform2 from "./ProcessTransform";

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
});

const { width, height } = Dimensions.get("window");
const perspective = 600;
const size = 200;

type Vec3 = [
  Animated.Adaptable<number>,
  Animated.Adaptable<number>,
  Animated.Adaptable<number>
];

interface FaceProps {
  backgroundColor: string;
  translate: Vec3;
  rotate: Vec3;
}

const Face = ({ backgroundColor, translate, rotate }: FaceProps) => {
  const tr = [
    { translateX: translate[0] },
    { translateY: translate[1] },
    { rotateY: rotate[1] },
    { rotateX: rotate[0] },
    { rotateZ: rotate[2] },
  ];
  const trAsString = [
    { perspective },
    { rotateY: `${Math.PI / 4}rad` },
    { rotateX: `${Math.PI / 4 + Math.PI / 2}rad` },
  ];
  const matrix3d = processTransform(tr);

  // http://learnwebgl.brown37.net/08_projections/projections_ortho.html
  // http://www.songho.ca/opengl/gl_projectionmatrix.html
  const fovInRadians = 0.872665;
  const aspect = width / height;
  const near = size;
  const far = size * 2;
  const h = 1 / Math.tan(fovInRadians / 2);
  const rDepth = 1 / (near - far);
  const C = (far + near) * rDepth;
  const D = 2 * (far * near * rDepth);
  const Z = matrix3d[2][2];
  // add(matrix3d[2][0], matrix3d[2][1], matrix3d[2][2], matrix3d[2][3]);
  /*
  const matrix2d = multiply4(matrix3d, [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1],
  ]);
  */

  const matrix2d = multiply4(matrix3d, [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1],
  ]);
  const {
    translateX: tx,
    translateY: ty,
    scaleX,
    scaleY,
    skewX,
    rotateZ,
  } = decompose2d(matrix2d);
  return (
    <>
      <View style={styles.container}>
        <Animated.View
          style={{
            opacity: 0.5,
            backgroundColor,
            width: size,
            height: size,
            transform: [
              { translateY: ty },
              { translateX: tx },
              { rotateZ: skewX },
              { scaleX },
              { scaleY },
              { rotateZ },
            ],
          }}
        />
      </View>
      <View style={styles.container}>
        <Animated.View
          style={{
            opacity: 0,
            backgroundColor: "cyan",
            width: size,
            height: size,
            transform: trAsString,
          }}
        />
      </View>
      <View style={styles.container}>
        <Animated.View
          style={{
            opacity: 0,
            backgroundColor: "red",
            width: size,
            height: size,
            transform: [{ matrix: processTransform2(trAsString) }],
          }}
        />
      </View>
    </>
  );
};

export default () => {
  const progress = new Value(0);
  useCode(() => set(progress, loop({ duration: 4000 })), [progress]);
  const r = Math.PI / 4; // mix(progress, 0, 2 * Math.PI);
  return (
    <>
      <Face
        rotate={[r, r, r]}
        translate={[0, size / 2, 0]}
        backgroundColor="green"
        {...{ progress }}
      />
      <Face
        rotate={[r, r, r]}
        translate={[0, -size / 2, 0]}
        backgroundColor="red"
        {...{ progress }}
      />
      <Face
        rotate={[r, r, add(r, Math.PI / 2)]}
        translate={[0, 0, 0]}
        backgroundColor="violet"
        {...{ progress }}
      />
    </>
  );
};

/*

      <Face
        translate={[0, 0, radius]}
        rotate={[r, 0]}
        backgroundColor="#4c72e0"
        {...{ progress }}
      />
        {this.renderFront("#4c72e0")}
        {this.renderBack("#8697df")}
        {this.renderLeft("#b5bce2")}
        {this.renderRight("#e5afb9")}
        {this.renderTop("#de7c92")}
        {this.renderBottom("#d1426b")}
      <Face
        translate={[0, 0, radius]}
        rotate={[r, 0]}
        backgroundColor="blue"
        {...{ progress }}
      />
      <Face
        translate={[x, y, y]}
        rotate={[r, 0]}
        backgroundColor="orange"
        {...{ progress }}
      />
      <Face
        translate={[y, y, y]}
        rotate={[r, 0]}
        backgroundColor="yellow"
        {...{ progress }}
      />
      <Face
        translate={[y, y, x]}
        rotate={[r, 0]}
        backgroundColor="green"
        {...{ progress }}
      />
      <Face
        translate={[y, x, x]}
        rotate={[r, 0]}
        backgroundColor="red"
        {...{ progress }}
      />
      */

const debugMatrix = (m) =>
  call([...m[0], ...m[1], ...m[2], ...m[3]], (v) =>
    console.log(`
[
  [${v[0]}, ${v[1]}, ${v[2]}, ${v[3]}] 
  [${v[4]}, ${v[5]}, ${v[6]}, ${v[7]}]
  [${v[8]}, ${v[9]}, ${v[10]}, ${v[11]}]
  [${v[12]}, ${v[13]}, ${v[14]}, ${v[15]}]
]`)
  );
