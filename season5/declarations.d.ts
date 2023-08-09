/* eslint-disable import/no-default-export */
declare module "*.sksl" {
  const data: string;
  export default data;
}

declare module "*.jpg" {
  const value: ReturnType<typeof require>;
  export default value;
}

declare module "*.png" {
  const value: ReturnType<typeof require>;
  export default value;
}

declare module "*.ttf" {
  const value: ReturnType<typeof require>;
  export default value;
}
