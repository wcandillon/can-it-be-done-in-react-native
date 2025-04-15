/* eslint-disable @typescript-eslint/no-var-requires */
import type { SkRect, Vector } from "@shopify/react-native-skia";
import {
  mix,
  Fill,
  Image,
  Canvas,
  Group,
  Vertices,
  ImageShader,
  rect,
  useImage,
  vec,
  useClock,
} from "@shopify/react-native-skia";
import React from "react";
import { Dimensions, Easing } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import type { SharedValue } from "react-native-reanimated";
import {
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { createNoise2D, createNoise3D } from "simplex-noise";

const pad = 6;
const deflate = (rct: SkRect, amount: number) => {
  return rect(
    rct.x + amount,
    rct.y + amount,
    rct.width - amount * 2,
    rct.height - amount * 2
  );
};
const screen = Dimensions.get("screen");
const frameAspectRatio = 1621 / 1244;
const frameWidth = 350;
const frameRect = rect(
  (screen.width - frameWidth) / 2,
  64,
  frameWidth,
  frameWidth * frameAspectRatio
);

const width = 225;
const aspectRatio = 1317 / 783;
const height = width * aspectRatio;
const pictureRect = rect((screen.width - width) / 2, 100, width, height);
const numberOfStripes = 10;
const stripeWidth = width / numberOfStripes;
const stripes = new Array(numberOfStripes).fill(0).map((_, i) => i);

const generateTrianglePointsAndIndices = (
  rct: SkRect,
  triangleNumberHeight: number,
  z: number
) => {
  const A = 5;
  const F = 1;
  const noise = createNoise3D();

  const vertices: Vector[] = [];
  const textures: Vector[] = [];
  const indices: number[] = [];

  // Calculate the size of the triangles based on the given number
  const triangleWidth = rct.width;
  const triangleHeight = rct.height / triangleNumberHeight;

  // Generate the list of points
  for (let i = 0; i <= triangleNumberHeight; i++) {
    for (let j = 0; j <= 1; j++) {
      const point: Vector = vec(
        rct.x + j * triangleWidth,
        rct.y + i * triangleHeight
      );
      textures.push(point);
      const d = A * noise((F * i) / triangleNumberHeight, F * j, z);
      vertices.push(vec(point.x + d, point.y + d));
    }
  }

  // Generate the list of triangle indices
  for (let i = 0; i < triangleNumberHeight; i++) {
    const topLeftIndex = i * 2;
    const topRightIndex = topLeftIndex + 1;
    const bottomLeftIndex = topLeftIndex + 2;
    const bottomRightIndex = bottomLeftIndex + 1;

    // Create two triangles for each square and add their indices to the list
    indices.push(topLeftIndex, topRightIndex, bottomLeftIndex);
    indices.push(bottomLeftIndex, topRightIndex, bottomRightIndex);
  }

  return { vertices, indices, textures };
};

interface StripeProps {
  index: number;
  clock: SharedValue<number>;
  a: SharedValue<number>;
  i0: SharedValue<number>;
  i: SharedValue<number>;
}

const Stripe = ({ index, clock, a, i0, i }: StripeProps) => {
  const animation = useSharedValue(0);
  const noise = createNoise2D();
  const x = index * stripeWidth;
  const rct = rect(x, 0, stripeWidth - pad, height);
  const { vertices, indices, textures } = generateTrianglePointsAndIndices(
    rct,
    20,
    index / numberOfStripes
  );
  const animatedVertices = useDerivedValue(() => {
    if (i0.value === index && i.value !== index) {
      animation.value = withTiming(
        1,
        { duration: 100, easing: Easing.linear },
        () => {
          animation.value = withSpring(0);
        }
      );
    }
    const t = clock.value * 0.0004;
    const f = mix(animation.value, 1, 2);
    return vertices.map((v, j) => {
      const d = (a.value + animation.value * 8) * noise(t * f, j);
      return vec(v.x + d, v.y + d);
    });
  });
  return (
    <Vertices
      vertices={animatedVertices}
      textures={textures}
      indices={indices}
    />
  );
};

export const Puzzle2 = () => {
  const i = useSharedValue(-1);
  const i0 = useSharedValue(-1);
  const y = useSharedValue(0);
  const offset = useSharedValue(0);
  const a = useSharedValue(2);

  const background = useImage(require("./assets/bg.jpg"));
  const frame = useImage(require("./assets/frame.png"));
  const picture = useImage(require("./assets/art1.jpg"));
  const clock = useClock();
  const gesture = Gesture.Pan()
    .onStart((e) => {
      offset.value = y.value - e.y;
    })
    .onChange((e) => {
      i0.value = i.value;
      i.value = Math.round((e.x - pictureRect.x) / stripeWidth);
      const newY = offset.value + e.y;
      if (newY > y.value) {
        y.value = newY;
      }
    })
    .onEnd(() => {
      i.value = -1;
      i0.value = -1;
      if (y.value + pictureRect.y > frameRect.y + frameRect.height - 40) {
        y.value = withTiming(screen.height + 100, { duration: 800 });
        a.value = withTiming(10, { duration: 200 });
      }
    });
  const transform = useDerivedValue(() => [{ translateY: y.value }]);
  if (!picture || !frame || !background) {
    return null;
  }
  return (
    <GestureDetector gesture={gesture}>
      <Canvas style={{ flex: 1 }}>
        <Fill color="#FDF8F7" />
        <Image image={background} fit="cover" rect={pictureRect} />
        <Group transform={transform}>
          <Group
            transform={[
              { translateX: pictureRect.x },
              { translateY: pictureRect.y + 10 },
            ]}
          >
            <ImageShader
              image={picture}
              rect={rect(0, 0, width, height)}
              fit="fill"
            />
            {stripes.map((index) => (
              <Stripe
                key={index}
                index={index}
                clock={clock}
                a={a}
                i0={i0}
                i={i}
              />
            ))}
          </Group>
        </Group>
        <Group clip={deflate(frameRect, 10)}>
          <Group transform={transform}>
            <Group>
              <Image image={picture} rect={pictureRect} fit="cover" />
            </Group>
          </Group>
        </Group>
        <Image image={frame} rect={frameRect} fit="fill" />
      </Canvas>
    </GestureDetector>
  );
};
