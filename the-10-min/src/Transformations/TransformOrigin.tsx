import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  Value,
  add,
  cos,
  interpolate,
  multiply,
  set,
  sin,
  sub,
  useCode,
} from "react-native-reanimated";
import { loop, mix, translateZ as tz } from "react-native-redash";
import { decompose2d, multiply4, processTransform } from "./Matrix";

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
});

const perspective = 600;
const size = 200;

const Face = ({
  backgroundColor,
  rotate: [rotateX, rotateY],
}: {
  backgroundColor: string;
  rotate: [Animated.Adaptable<number>, Animated.Adaptable<number>];
}) => {
  const matrix3d = processTransform([
    { perspective },
    { rotateY },
    { rotateX },
  ]);
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
            opacity: 0.5,
            backgroundColor,
            width: size,
            height: size,
            transform: [{ perspective }, { rotateY }, { rotateX }],
          }}
        />
      </View>
    </>
  );
};

export default () => {
  const progress = new Value(0);
  useCode(() => set(progress, loop({ duration: 4000 })), [progress]);
  const rotateY = mix(progress, 0, 2 * Math.PI);
  return (
    <>
      <Face
        rotate={[0, rotateY]}
        translate={[0, 0, 0]}
        backgroundColor="#4c72e0"
        {...{ progress }}
      />
      <Face
        rotate={[0, add(rotateY, Math.PI / 2)]}
        translate={[0, 0, 0]}
        backgroundColor="#de7c92"
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
