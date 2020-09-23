import { interpolate } from "react-native-reanimated";
import parseSVG from "parse-svg-path";
import absSVG from "abs-svg-path";
import normalizeSVG from "normalize-svg-path";
import { Vector } from "react-native-redash";

import { cubicBezierYForX } from "./Math";

type SVGCloseCommand = ["Z"];
type SVGMoveCommand = ["M", number, number];
type SVGCurveCommand = ["C", number, number, number, number, number, number];
type SVGNormalizedCommands = [
  SVGMoveCommand | SVGCurveCommand | SVGCloseCommand
];

export enum SVGCommand {
  MOVE,
  CURVE,
  CLOSE,
}

interface Move extends Vector {
  type: SVGCommand.MOVE;
}

interface Curve {
  type: SVGCommand.CURVE;
  from: Vector;
  to: Vector;
  c1: Vector;
  c2: Vector;
}

interface Close {
  type: SVGCommand.CLOSE;
}

export type Segment = Close | Curve | Move;
export type Path = Segment[];

export const exhaustiveCheck = (command: never): never => {
  "worklet";
  throw new TypeError(`Unknown SVG Command: ${command}`);
};

const serializeMove = (c: Move) => {
  "worklet";
  return `M${c.x},${c.y} `;
};

const serializeClose = () => {
  "worklet";
  return "Z";
};

const serializeCurve = (c: Curve) => {
  "worklet";
  return `C${c.c1.x},${c.c1.y} ${c.c2.x},${c.c2.y} ${c.to.x},${c.to.y} `;
};

const isMove = (command: Segment): command is Move => {
  "worklet";
  return command.type === SVGCommand.MOVE;
};

const isCurve = (command: Segment): command is Curve => {
  "worklet";
  return command.type === SVGCommand.CURVE;
};

const isClose = (command: Segment): command is Close => {
  "worklet";
  return command.type === SVGCommand.CLOSE;
};

export const serialize = (path: Path) => {
  "worklet";
  return path
    .map((segment) => {
      if (isMove(segment)) {
        return serializeMove(segment);
      }
      if (isCurve(segment)) {
        return serializeCurve(segment);
      }
      if (isClose(segment)) {
        return serializeClose();
      }
      return exhaustiveCheck(segment);
    })
    .reduce((acc, c) => acc + c);
};

export const parse = (d: string): Path => {
  const segments: SVGNormalizedCommands = normalizeSVG(absSVG(parseSVG(d)));
  return segments.map((segment, index) => {
    if (segment[0] === "M") {
      return move(segment[1], segment[2]);
    } else if (segment[0] === "Z") {
      return close();
    } else {
      const prev = segments[index - 1];
      const r = curve({
        c1: {
          x: segment[1],
          y: segment[2],
        },
        c2: {
          x: segment[3],
          y: segment[4],
        },
        to: {
          x: segment[5],
          y: segment[6],
        },
        from: {
          x: (prev[0] === "M" ? prev[1] : prev[5]) ?? 0,
          y: (prev[0] === "M" ? prev[2] : prev[6]) ?? 0,
        },
      });
      return r;
    }
  });
};

export const interpolatePath = (
  value: number,
  inputRange: number[],
  outputRange: Path[]
) => {
  "worklet";
  const path = outputRange[0].map((segment, index) => {
    if (isMove(segment)) {
      const points = outputRange.map((p) => {
        const s = p[index];
        if (isMove(s)) {
          return {
            x: s.x,
            y: s.y,
          };
        }
        throw new Error("Paths to interpolate are not symetrical");
      });
      return {
        type: SVGCommand.MOVE,
        x: interpolate(
          value,
          inputRange,
          points.map((p) => p.x)
        ),
        y: interpolate(
          value,
          inputRange,
          points.map((p) => p.y)
        ),
      } as Move;
    }
    if (isCurve(segment)) {
      const curves = outputRange.map((p) => {
        const s = p[index];
        if (isCurve(s)) {
          return {
            to: s.to,
            c1: s.c1,
            c2: s.c2,
          };
        }
        throw new Error("Paths to interpolate are not symetrical");
      });
      return {
        type: SVGCommand.CURVE,
        to: {
          x: interpolate(
            value,
            inputRange,
            curves.map((c) => c.to.x)
          ),
          y: interpolate(
            value,
            inputRange,
            curves.map((c) => c.to.y)
          ),
        },
        c1: {
          x: interpolate(
            value,
            inputRange,
            curves.map((c) => c.c1.x)
          ),
          y: interpolate(
            value,
            inputRange,
            curves.map((c) => c.c1.y)
          ),
        },
        c2: {
          x: interpolate(
            value,
            inputRange,
            curves.map((c) => c.c2.x)
          ),
          y: interpolate(
            value,
            inputRange,
            curves.map((c) => c.c2.y)
          ),
        },
      } as Curve;
    }
    return segment;
  });
  return serialize(path);
};

export const mixPath = (value: number, p1: Path, p2: Path) => {
  "worklet";
  return interpolatePath(value, [0, 1], [p1, p2]);
};

export const move = (x: number, y: number) => {
  "worklet";
  return { type: SVGCommand.MOVE as const, x, y };
};

export const curve = (c: Omit<Curve, "type">) => {
  "worklet";
  return {
    type: SVGCommand.CURVE as const,
    c1: c.c1,
    c2: c.c2,
    to: c.to,
    from: c.from,
  };
};

export const close = () => {
  "worklet";
  return { type: SVGCommand.CLOSE as const };
};

export const getYForX = (path: Path, x: number) => {
  "worklet";
  try {
    const p = path.filter((c) => {
      if (isCurve(c)) {
        if (c.from.x > c.to.x) {
          return x >= c.to.x && x <= c.from.x;
        }
        return x >= c.from.x && x <= c.to.x;
      }
      return false;
    });
    return cubicBezierYForX(x, p[0].from, p[0].c1, p[0].c2, p[0].to);
  } catch (e) {
    console.log("error");
  }
  return 0;
};
