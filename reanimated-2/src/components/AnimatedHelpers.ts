export const canvas2Cartesian = ({ x, y }, center) => {
  "worklet";
  return {
    x: x - center.x,
    y: -1 * (y - center.y),
  };
};

export const cartesian2Canvas = ({ x, y }, center) => {
  "worklet";
  return {
    x: x + center.x,
    y: -1 * y + center.y,
  };
};

export const cartesian2Polar = ({ x, y }) => {
  "worklet";
  return {
    theta: Math.atan2(y, x),
    radius: Math.sqrt(x ** 2 + y ** 2),
  };
};

export const polar2Cartesian = ({ theta, radius }) => {
  "worklet";
  return {
    x: radius * Math.cos(theta),
    y: radius * Math.sin(theta),
  };
};

export const polar2Canvas = ({ theta, radius }, center) => {
  "worklet";
  return cartesian2Canvas(polar2Cartesian({ theta, radius }), center);
};

export const canvas2Polar = ({ x, y }, center) => {
  "worklet";
  return cartesian2Polar(canvas2Cartesian({ x, y }, center));
};

export const clamp = (value, lowerBound, upperBound) => {
  "worklet";
  return Math.min(Math.max(lowerBound, value), upperBound);
};

export function withDecay(userConfig, callback) {
  "worklet";

  // TODO: not sure what should I return here
  // if (!_WORKLET) {
  //   return toValue;
  // }

  const config = {
    deceleration: 0.998,
  };
  if (userConfig) {
    Object.keys(userConfig).forEach((key) => (config[key] = userConfig[key]));
  }

  const VELOCITY_EPS = 5;

  function decay(animation, now) {
    const {
      toValue,
      lastTimestamp,
      initialVelocity,
      current,
      velocity,
    } = animation;

    const deltaTime = Math.min(now - lastTimestamp, 64);
    animation.lastTimestamp = now;

    const kv = Math.pow(config.deceleration, deltaTime);
    const kx = (config.deceleration * (1 - kv)) / (1 - config.deceleration);

    const v0 = velocity / 1000;
    const v = v0 * kv * 1000;
    const x = current + v0 * kx;

    animation.current = x;
    animation.velocity = v;

    let toValueIsReached = null;

    if (Array.isArray(config.clamp)) {
      if (initialVelocity < 0 && animation.current <= config.clamp[0]) {
        toValueIsReached = config.clamp[0];
      } else if (initialVelocity > 0 && animation.current >= config.clamp[1]) {
        toValueIsReached = config.clamp[1];
      }
    }

    if (Math.abs(v) < VELOCITY_EPS || toValueIsReached !== null) {
      if (toValueIsReached !== null) {
        console.log(toValueIsReached);
        animation.current = toValueIsReached;
      }

      return true;
    }
  }

  function start(animation, value, now, previousAnimation) {
    animation.current = value;
    animation.lastTimestamp = now;
    animation.initialVelocity = config.velocity;
  }

  return {
    animation: decay,
    start,
    velocity: config.velocity || 0,
    callback,
  };
}
