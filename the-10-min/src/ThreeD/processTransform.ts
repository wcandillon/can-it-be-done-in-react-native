/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * @flow
 */

import MatrixMath from "react-native/Libraries/Utilities/MatrixMath";

const invariant = require("invariant");

/**
 * Generate a transform matrix based on the provided transforms, and use that
 * within the style object instead.
 *
 * This allows us to provide an API that is similar to CSS, where transforms may
 * be applied in an arbitrary order, and yet have a universal, singular
 * interface to native code.
 */
function processTransform(
  transform: Array<Record<string, any>>
): Array<Record<string, any>> | Array<number> {
  // Android & iOS implementations of transform property accept the list of
  // transform properties as opposed to a transform Matrix. This is necessary
  // to control transform property updates completely on the native thread.

  const result = MatrixMath.createIdentityMatrix();

  transform.forEach((transformation) => {
    const key = Object.keys(transformation)[0];
    const value = transformation[key];

    switch (key) {
      case "matrix":
        MatrixMath.multiplyInto(result, result, value);
        break;
      case "perspective":
        _multiplyTransform(result, MatrixMath.reusePerspectiveCommand, [value]);
        break;
      case "rotateX":
        _multiplyTransform(result, MatrixMath.reuseRotateXCommand, [
          _convertToRadians(value),
        ]);
        break;
      case "rotateY":
        _multiplyTransform(result, MatrixMath.reuseRotateYCommand, [
          _convertToRadians(value),
        ]);
        break;
      case "rotate":
      case "rotateZ":
        _multiplyTransform(result, MatrixMath.reuseRotateZCommand, [
          _convertToRadians(value),
        ]);
        break;
      case "scale":
        _multiplyTransform(result, MatrixMath.reuseScaleCommand, [value]);
        break;
      case "scaleX":
        _multiplyTransform(result, MatrixMath.reuseScaleXCommand, [value]);
        break;
      case "scaleY":
        _multiplyTransform(result, MatrixMath.reuseScaleYCommand, [value]);
        break;
      case "translate":
        _multiplyTransform(result, MatrixMath.reuseTranslate3dCommand, [
          value[0],
          value[1],
          value[2] || 0,
        ]);
        break;
      case "translateX":
        _multiplyTransform(result, MatrixMath.reuseTranslate2dCommand, [
          value,
          0,
        ]);
        break;
      case "translateY":
        _multiplyTransform(result, MatrixMath.reuseTranslate2dCommand, [
          0,
          value,
        ]);
        break;
      case "skewX":
        _multiplyTransform(result, MatrixMath.reuseSkewXCommand, [
          _convertToRadians(value),
        ]);
        break;
      case "skewY":
        _multiplyTransform(result, MatrixMath.reuseSkewYCommand, [
          _convertToRadians(value),
        ]);
        break;
      default:
        throw new Error(`Invalid transform name: ${key}`);
    }
  });

  return result;
}

/**
 * Performs a destructive operation on a transform matrix.
 */
function _multiplyTransform(
  result: Array<number>,
  matrixMathFunction: Function,
  args: Array<number>
): void {
  const matrixToApply = MatrixMath.createIdentityMatrix();
  const argsWithIdentity = [matrixToApply].concat(args);
  matrixMathFunction.apply(this, argsWithIdentity);
  MatrixMath.multiplyInto(result, result, matrixToApply);
}

/**
 * Parses a string like '0.5rad' or '60deg' into radians expressed in a float.
 * Note that validation on the string is done in `_validateTransform()`.
 */
function _convertToRadians(value: string): number {
  const floatValue = parseFloat(value);
  return value.indexOf("rad") > -1 ? floatValue : (floatValue * Math.PI) / 180;
}

module.exports = processTransform;
