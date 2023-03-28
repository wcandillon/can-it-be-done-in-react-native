/* eslint-disable @typescript-eslint/no-var-requires */
import type { SkiaValue, SkRect, Vector } from "@shopify/react-native-skia";
import {
  Line,
  runTiming,
  Fill,
  Rect,
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
}

const Stripe = ({ index, clock }: StripeProps) => {
  const freq = useValue(1);
  const noise = createNoise2D();
  const x = index * stripeWidth;
  const rct = rect(x, 0, stripeWidth - pad, height);
  const { vertices, indices, textures } = generateTrianglePointsAndIndices(
    rct,
    20,
    index / numberOfStripes
  );
  const animatedVertices = useComputedValue(() => {
    const t = clock.current * 0.0004 * freq.current;
    return vertices.map((v, i) => {
      const d = 2 * noise(t, i);
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
  const y = useValue(0);
  const offset = useValue(0);
  const background = useImage(require("./assets/bg.jpg"));
  const frame = useImage(require("./assets/frame.png"));
  const picture = useImage(require("./assets/art1.jpg"));
  const clock = useClockValue();
  const onTouch = useTouchHandler({
    onStart: (e) => {
      offset.current = y.current - e.y;
    },
    onActive: (e) => {
      const newY = offset.current + e.y;
      if (newY > y.current) {
        y.current = newY;
      }
    },
    onEnd: () => {
      if (y.current + pictureRect.y > frameRect.y + frameRect.height) {
        runTiming(y, screen.height + 100, { duration: 400 });
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
            { translateY: pictureRect.y + 5 },
          ]}
        >
          <ImageShader
            image={picture}
            rect={rect(0, 0, width, height)}
            fit="fill"
          />
          {stripes.map((index) => (
            <Stripe key={index} index={index} clock={clock} />
          ))}
        </Group>
      </Group>
      <Group clip={deflate(frameRect, 10)}>
        <Group transform={transform}>
          <Group>
            <Image image={picture} rect={pictureRect} fit="fill" />
          </Group>
        </Group>
      </Group>
      <Image image={frame} rect={frameRect} fit="fill" />
    </Canvas>
  );
};
