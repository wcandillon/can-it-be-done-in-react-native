import type { ExpoWebGLRenderingContext } from "expo-gl";
import { GLView } from "expo-gl";
import React from "react";
import { StyleSheet } from "react-native";

const onContextCreate = (gl: ExpoWebGLRenderingContext) => {
  gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
  gl.clearColor(1.0, 1.0, 1.0, 1.0);

  // Create vertex shader (shape & position)
  const vert = gl.createShader(gl.VERTEX_SHADER)!;
  gl.shaderSource(
    vert,
    `
attribute vec4 aPosition;               
varying vec2 uv;
void main()
{
    gl_Position = aPosition;
    uv = vec2((aPosition.x + 1.0) / 2.0, (aPosition.y + 1.0) / 2.0) ;
}
  `
  );
  gl.compileShader(vert);

  // Create fragment shader (color)
  const frag = gl.createShader(gl.FRAGMENT_SHADER)!;
  gl.shaderSource(
    frag,
    `
precision mediump float;
varying vec2 uv;
void main()
{
    gl_FragColor = vec4(uv.x, uv.y, 0.9, 1.0);
}
  `
  );
  gl.compileShader(frag);

  // Link together into a program
  const program = gl.createProgram()!;
  gl.attachShader(program, vert);
  gl.attachShader(program, frag);
  gl.linkProgram(program);
  gl.useProgram(program);

  const vertices = new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]);

  // Load the data into the GPU
  const bufferId = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

  // Associate our shader variables with our data buffer
  const aPosition = gl.getAttribLocation(program, "aPosition");
  gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(aPosition);

  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);

  gl.flush();
  gl.endFrameEXP();
};

export const WebGL = () => {
  return <GLView style={styles.container} onContextCreate={onContextCreate} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
