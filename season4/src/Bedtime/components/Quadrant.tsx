import React from "react";
import { polar2Canvas } from "react-native-redash";
import { Circle, Line, G } from "react-native-svg";

import { CENTER, PADDING, R, SIZE, STROKE, TAU } from "../Constants";

const LINES = 75;
const DELTA = TAU / LINES;

const Quadrant = () => {
  return (
    <>
      <Circle
        strokeWidth={STROKE}
        stroke="#1C1B1D"
        cx={SIZE / 2}
        cy={SIZE / 2}
        r={R}
      />
      <G mask="url(#mask)">
        <Circle fill="#FD9F07" cx={SIZE / 2} cy={SIZE / 2} r={R + PADDING} />
        {new Array(LINES).fill(0).map((_, i) => {
          const theta = DELTA * i;
          const p1 = polar2Canvas({ theta, radius: R - PADDING / 2 }, CENTER);
          const p2 = polar2Canvas({ theta, radius: R + PADDING / 2 }, CENTER);
          return (
            <Line
              stroke="#E58406"
              strokeWidth={4}
              strokeLinecap="round"
              key={i}
              x1={p1.x}
              y1={p1.y}
              x2={p2.x}
              y2={p2.y}
            />
          );
        })}
      </G>
      {new Array(24).fill(0).map((_, i) => {
        const theta = (i * TAU) / 24;
        const p1 = polar2Canvas({ theta, radius: R - 2 * PADDING }, CENTER);
        const p2 = polar2Canvas(
          { theta, radius: R - (3 * PADDING) / 2 },
          CENTER
        );
        return (
          <React.Fragment key={i}>
            <Line
              stroke="#646367"
              strokeWidth={2}
              strokeLinecap="round"
              x1={p1.x}
              y1={p1.y}
              x2={p2.x}
              y2={p2.y}
            />
            {new Array(4).fill(0).map((_e, j) => {
              const alpha = (i * TAU) / 24 + (j + 1) * (TAU / 24 / 4);
              const s = polar2Canvas(
                { theta: alpha, radius: R - 1.75 * PADDING },
                CENTER
              );
              const e = polar2Canvas(
                { theta: alpha, radius: R - (3 * PADDING) / 2 },
                CENTER
              );
              return (
                <Line
                  stroke="#646367"
                  strokeWidth={2}
                  strokeLinecap="round"
                  key={j}
                  x1={s.x}
                  y1={s.y}
                  x2={e.x}
                  y2={e.y}
                />
              );
            })}
          </React.Fragment>
        );
      })}
    </>
  );
};

export default Quadrant;
