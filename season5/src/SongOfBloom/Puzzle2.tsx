/* eslint-disable @typescript-eslint/no-var-requires */
import type { SkiaValue, SkRect, Vector } from "@shopify/react-native-skia";
import {
  runSpring,
  mix,
  runTiming,
  Fill,
  Image,
  useComputedValue,
  useClockValue,
  useValue,
  Canvas,
  Group,
  Vertices,
  ImageShader,
  rect,
  useImage,
  vec,
  Easing,
  useTouchHandler,
} from "@shopify/react-native-skia";
import React from "react";
import { Dimensions } from "react-native";
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
  clock: SkiaValue<number>;
  a: SkiaValue<number>;
  i0: SkiaValue<number>;
  i: SkiaValue<number>;
}

const Stripe = ({ index, clock, a, i0, i }: StripeProps) => {
  const animation = useValue(0);
  const noise = createNoise2D();
  const x = index * stripeWidth;
  const rct = rect(x, 0, stripeWidth - pad, height);
  const { vertices, indices, textures } = generateTrianglePointsAndIndices(
    rct,
    20,
    index / numberOfStripes
  );
  const animatedVertices = useComputedValue(() => {
    if (i0.current === index && i.current !== index) {
      runTiming(animation, 1, { duration: 100, easing: Easing.linear }, () => {
        runSpring(animation, 0);
      });
    }
    const t = clock.current * 0.0004;
    const f = mix(animation.current, 1, 2);
    return vertices.map((v, j) => {
      const d = (a.current + animation.current * 8) * noise(t * f, j);
      return vec(v.x + d, v.y + d);
    });
  }, [clock]);
  return (
    <Vertices
      vertices={animatedVertices}
      textures={textures}
      indices={indices}
    />
  );
};

export const Puzzle2 = () => {
  const i = useValue(-1);
  const i0 = useValue(-1);
  const y = useValue(0);
  const offset = useValue(0);
  const a = useValue(2);

  const background = useImage(require("./assets/bg.jpg"));
  const frame = useImage(require("./assets/frame.png"));
  const picture = useImage(require("./assets/art1.jpg"));
  const clock = useClockValue();
  const onTouch = useTouchHandler({
    onStart: (e) => {
      offset.current = y.current - e.y;
    },
    onActive: (e) => {
      i0.current = i.current;
      i.current = Math.round((e.x - pictureRect.x) / stripeWidth);
      const newY = offset.current + e.y;
      if (newY > y.current) {
        y.current = newY;
      }
    },
    onEnd: () => {
      i.current = -1;
      i0.current = -1;
      if (y.current + pictureRect.y > frameRect.y + frameRect.height - 40) {
        runTiming(y, screen.height + 100, { duration: 800 });
        runTiming(a, 10, { duration: 200 });
      }
    },
  });
  const transform = useComputedValue(() => [{ translateY: y.current }], [y]);
  if (!picture || !frame || !background) {
    return null;
  }
  return (
    <Canvas style={{ flex: 1 }} onTouch={onTouch}>
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
  );
};
