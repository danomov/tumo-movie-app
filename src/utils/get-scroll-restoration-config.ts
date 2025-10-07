import { EScrollRestorationPages, EScrollRestorationVariants } from "@/types.ts";
import { matchPath } from "react-router";

const SCROLL_RESTORATION_CONFIGS = {
  [EScrollRestorationPages.Home]: EScrollRestorationVariants.Initial,
  [EScrollRestorationPages.Movie]: EScrollRestorationVariants.Top,
};

const SCROLL_RESTORATION_PATHS = {
  "/": EScrollRestorationPages.Home,
  "/movie/:id": EScrollRestorationPages.Movie,
};

function getPathSignature(pathname: string, routesConfig: string[]) {
  for (const path of routesConfig) {
    const match = matchPath(path, pathname);

    if (match) {
      return path;
    }
  }
}

export function getScrollRestorationConfig(pathname: string) {
  const matchedSignature = getPathSignature(
    pathname,
    Object.keys(SCROLL_RESTORATION_PATHS)
  ) as keyof typeof SCROLL_RESTORATION_PATHS;

  const key = SCROLL_RESTORATION_PATHS[matchedSignature];
  const variant = SCROLL_RESTORATION_CONFIGS[key];

  return { key, variant };
}