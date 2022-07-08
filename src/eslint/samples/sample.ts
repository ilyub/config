import { deprecated } from "./deprecated";

export const a = import(
  /* webpackChunkName: "dynamic/a" */
  "node:buffer"
);

export const b = import(
  /* webpackChunkName: "dynamic/a/b" */
  "node:buffer"
);

// eslint-disable-next-line deprecation/deprecation -- Ok
deprecated();
