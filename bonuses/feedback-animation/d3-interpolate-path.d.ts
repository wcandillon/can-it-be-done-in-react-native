declare module "d3-interpolate-path" {
  export function interpolatePath(source: string, target: string): (ratio: number) => string;
}
