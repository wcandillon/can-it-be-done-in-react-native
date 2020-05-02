export type Vec4 = readonly [number, number, number, number];

export type Matrix4 = readonly [Vec4, Vec4, Vec4, Vec4];

const { cos, sin, tan } = Math;
const add = (...args: number[]) => args.reduce((a, b) => a + b);
const multiply = (...args: number[]) => args.reduce((a, b) => a * b);
const divide = (...args: number[]) => args.reduce((a, b) => a / b);
type TransformName =
  | "translateX"
  | "translateY"
  | "translateZ"
  | "scale"
  | "scaleX"
  | "scaleY"
  | "skewX"
  | "skewY"
  | "rotateZ"
  | "rotate"
  | "perspective"
  | "rotateX"
  | "rotateY"
  | "rotateZ";
type Transformations = { [Name in TransformName]: number };
export type Transforms = (
  | Pick<Transformations, "translateX">
  | Pick<Transformations, "translateY">
  | Pick<Transformations, "translateZ">
  | Pick<Transformations, "scale">
  | Pick<Transformations, "scaleX">
  | Pick<Transformations, "scaleY">
  | Pick<Transformations, "perspective">
  | Pick<Transformations, "rotateX">
  | Pick<Transformations, "rotateY">
  | Pick<Transformations, "rotateZ">
  | Pick<Transformations, "rotate">
)[];

const exhaustiveCheck = (a: never): never => {
  throw new Error(`Unexhaustive handling for ${a}`);
};

const identityMatrix: Matrix4 = [
  [1, 0, 0, 0],
  [0, 1, 0, 0],
  [0, 0, 1, 0],
  [0, 0, 0, 1],
];

const translateXMatrix = (x: number): Matrix4 => [
  [1, 0, 0, x],
  [0, 1, 0, 0],
  [0, 0, 1, 0],
  [0, 0, 0, 1],
];

const translateYMatrix = (y: number): Matrix4 => [
  [1, 0, 0, 0],
  [0, 1, 0, y],
  [0, 0, 1, 0],
  [0, 0, 0, 1],
];

const translateZMatrix = (z: number): Matrix4 => [
  [1, 0, 0, 0],
  [0, 1, 0, 0],
  [0, 0, 1, z],
  [0, 0, 0, 1],
];

const scaleMatrix = (s: number): Matrix4 => [
  [s, 0, 0, 0],
  [0, s, 0, 0],
  [0, 0, 1, 0],
  [0, 0, 0, 1],
];

const scaleXMatrix = (s: number): Matrix4 => [
  [s, 0, 0, 0],
  [0, 1, 0, 0],
  [0, 0, 1, 0],
  [0, 0, 0, 1],
];

const skewXMatrix = (s: number): Matrix4 => [
  [1, tan(s), 0, 0],
  [0, 1, 0, 0],
  [0, 0, 1, 0],
  [0, 0, 0, 1],
];

const skewYMatrix = (s: number): Matrix4 => [
  [1, 0, 0, 0],
  [tan(s), 1, 0, 0],
  [0, 0, 1, 0],
  [0, 0, 0, 1],
];

const scaleYMatrix = (s: number): Matrix4 => [
  [1, 0, 0, 0],
  [0, s, 0, 0],
  [0, 0, 1, 0],
  [0, 0, 0, 1],
];

const perspectiveMatrix = (p: number): Matrix4 => [
  [1, 0, 0, 0],
  [0, 1, 0, 0],
  [0, 0, 1, 0],
  [0, 0, divide(-1, p), 1],
];

const rotateXMatrix = (r: number): Matrix4 => [
  [1, 0, 0, 0],
  [0, cos(r), multiply(-1, sin(r)), 0],
  [0, sin(r), cos(r), 0],
  [0, 0, 0, 1],
];

const rotateYMatrix = (r: number): Matrix4 => [
  [cos(r), 0, sin(r), 0],
  [0, 1, 0, 0],
  [multiply(-1, sin(r)), 0, cos(r), 0],
  [0, 0, 0, 1],
];

const rotateZMatrix = (r: number): Matrix4 => [
  [cos(r), multiply(-1, sin(r)), 0, 0],
  [sin(r), cos(r), 0, 0],
  [0, 0, 1, 0],
  [0, 0, 0, 1],
];

export const dot4 = (row: Vec4, col: Vec4) => {
  return add(
    multiply(row[0], col[0]),
    multiply(row[1], col[1]),
    multiply(row[2], col[2]),
    multiply(row[3], col[3])
  );
};

export const multiply4 = (m1: Matrix4, m2: Matrix4) => {
  const col0 = [m2[0][0], m2[1][0], m2[2][0], m2[3][0]] as const;
  const col1 = [m2[0][1], m2[1][1], m2[2][1], m2[3][1]] as const;
  const col2 = [m2[0][2], m2[1][2], m2[2][2], m2[3][2]] as const;
  const col3 = [m2[0][3], m2[1][3], m2[2][3], m2[3][3]] as const;
  return [
    [
      dot4(m1[0], col0),
      dot4(m1[0], col1),
      dot4(m1[0], col2),
      dot4(m1[0], col3),
    ],
    [
      dot4(m1[1], col0),
      dot4(m1[1], col1),
      dot4(m1[1], col2),
      dot4(m1[1], col3),
    ],
    [
      dot4(m1[2], col0),
      dot4(m1[2], col1),
      dot4(m1[2], col2),
      dot4(m1[2], col3),
    ],
    [
      dot4(m1[3], col0),
      dot4(m1[3], col1),
      dot4(m1[3], col2),
      dot4(m1[3], col3),
    ],
  ] as const;
};

export const processTransform = (transforms: Transforms) => {
  const m = transforms.reduce((acc, transform) => {
    const key = Object.keys(transform)[0] as TransformName;
    const value = (transform as Pick<Transformations, typeof key>)[key];
    if (key === "translateX") {
      return multiply4(acc, translateXMatrix(value));
    }
    if (key === "translateY") {
      return multiply4(acc, translateYMatrix(value));
    }
    if (key === "translateZ") {
      return multiply4(acc, translateZMatrix(value));
    }
    if (key === "scale") {
      return multiply4(acc, scaleMatrix(value));
    }
    if (key === "scaleX") {
      return multiply4(acc, scaleXMatrix(value));
    }
    if (key === "scaleY") {
      return multiply4(acc, scaleYMatrix(value));
    }
    if (key === "skewX") {
      return multiply4(acc, skewXMatrix(value));
    }
    if (key === "skewY") {
      return multiply4(acc, skewYMatrix(value));
    }
    if (key === "rotateX") {
      return multiply4(acc, rotateXMatrix(value));
    }
    if (key === "rotateY") {
      return multiply4(acc, rotateYMatrix(value));
    }
    if (key === "perspective") {
      return multiply4(acc, perspectiveMatrix(value));
    }
    if (key === "rotate" || key === "rotateZ") {
      return multiply4(acc, rotateZMatrix(value));
    }
    return exhaustiveCheck(key);
  }, identityMatrix);
  return [
    m[0][0],
    m[1][0],
    m[2][0],
    m[3][0],
    m[0][1],
    m[1][1],
    m[2][1],
    m[3][1],
    m[0][2],
    m[1][2],
    m[2][2],
    m[3][2],
    m[0][3],
    m[1][3],
    m[2][3],
    m[3][3],
  ];
};
