import type { SkiaValue, SkRect, Vector } from "@shopify/react-native-skia";
import {
  useComputedValue,
  useClockValue,
  Shadow,
  Canvas,
  Group,
  Vertices,
  ImageShader,
  rect,
  useImage,
  vec,
} from "@shopify/react-native-skia";
import React from "react";
import { createNoise2D, createNoise3D } from "simplex-noise";

const aspectRatio = 1030 / 564;
const width = 300;
const height = width * aspectRatio;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const art = require("./assets/art1.jpg");
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
  const noise = createNoise2D();
  const x = index * stripeWidth;
  const rct = rect(x, 0, stripeWidth, height);
  const { vertices, indices, textures } = generateTrianglePointsAndIndices(
    rct,
    20,
    index / numberOfStripes
  );
  const animatedVertices = useComputedValue(() => {
    const t = clock.current * 0.0004;
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
      transform={[{ translateX: index * 5 }]}
    >
      {/* <Shadow dx={4} dy={4} color="rgba(0, 0, 0, 0.4)" blur={4} /> */}
    </Vertices>
  );
};

export const Puzzle2 = () => {
  const image = useImage(art);
  const clock = useClockValue();

  if (!image) {
    return null;
  }
  return (
    <Canvas style={{ flex: 1 }}>
      <Group>
        <ImageShader
          image={image}
          rect={rect(0, 0, width, height)}
          fit="fill"
        />
        {stripes.map((index) => (
          <Stripe key={index} index={index} clock={clock} />
        ))}
      </Group>
    </Canvas>
  );
};
