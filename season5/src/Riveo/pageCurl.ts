import { Skia } from "@shopify/react-native-skia";

const frag = (code: TemplateStringsArray) => {
  const rt = Skia.RuntimeEffect.Make(code.join(""));
  if (rt === null) {
    throw new Error("Couln't Compile Sahder");
  }
  return rt;
};

export const pageCurl = frag`  
uniform shader image;
uniform float pointer;
uniform float origin;
uniform vec2 resolution;

const float PI = 3.1415926535897932384626433832795;
const float r = 225.0;
vec4 color = vec4(0., 0., 0., 0.);

struct Paint {
  float4 color;
  bool stroke;
  float strokeWidth;
};

struct Context  {
  float4 color;
  float2 p;
};

float sdLine(vec2 p, vec2 a, vec2 b) {
  vec2 pa = p - a;
  vec2 ba = b - a;
  float h = saturate(dot(pa, ba) / dot(ba, ba));
  return length(pa - ba * h);
}

float4 draw(float4 color, float d, Paint paint) {
  bool isFill = !paint.stroke && d < 0;
  bool isStroke = paint.stroke && abs(d) < paint.strokeWidth/2;
  if (isFill || isStroke) {
    return paint.color;
  }
  return color;
}

void drawLine(inout Context ctx, float2 a, float2 b, Paint paint) {
  float d = sdLine(ctx.p, a, b);
  ctx.color = draw(ctx.color, d, paint); 
}

vec4 main(float2 xy) {
  Context ctx = Context(image.eval(xy), xy);
  float dx = origin - pointer; 
  float x = resolution.x - dx;
  float d = xy.x - x;

  float2 a = vec2(x, resolution.y * 0.5);
  float2 b = vec2(resolution.x, resolution.y * 0.5);
  float2 e = vec2(resolution.x - r, 0);
  float2 f = vec2(resolution.x - r, resolution.y);
  Paint paint = Paint(vec4(0., 0., 1., 1.), true, 20.);
  drawLine(ctx, a, b, paint);
  drawLine(ctx, e, f, paint);
  if (d > 0) {
    ctx.color = vec4(0., 0., 0., 0.);
  }
  return ctx.color;
}
`;
