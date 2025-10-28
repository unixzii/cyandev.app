import "react-router";
import type { Metadata } from "./types";

declare module "react-router" {
  interface IndexRouteObject {
    metadata?: Metadata;
  }

  interface NonIndexRouteObject {
    metadata?: Metadata;
  }
}
