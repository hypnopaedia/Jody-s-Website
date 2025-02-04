import { JSX } from "react";

export type Child = JSX.Element | string | undefined;
export type Children = Child[] | Child | undefined;
export type FlexWrap = "nowrap" | "wrap" | "wrap-reverse";
