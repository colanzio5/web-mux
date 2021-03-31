import { CSSProperties } from "@vue/runtime-dom";

export const CONTAINER_BORDER_SIZE = 1;
export const WINDOW_BORDER_SIZE = 2;
export const CSS_PADDING_PIXEL_SIZE = 0;
export const CONTAINER_BORDER_COLOR = "black";
export const WINDOW_BORDER_COLOR = "white";

export type Container = {
  id: string;
  direction: string;
  scale: number;
  children: Container[];
  // managed during vue runtime
  parentContainer?: Container;
};

export function getContainerCSS(
  container: Container,
  parentContainer: Container
): CSSProperties {
  const containerCSS: CSSProperties = {};
  switch (parentContainer.direction) {
    case "VERTICAL":
      containerCSS.display = "inline-block"; // required only for the vertical case
      containerCSS.height = "100%";
      containerCSS.width = container.scale * 100 + "%";
      break;
    case "HORIZONTAL":
      containerCSS.height = container.scale * 100 + "%";
      containerCSS.width = "100%";
      break;
    case "UNDEFINED":
      containerCSS.height = "100%";
      containerCSS.width = "100%";
      break;
    default:
      console.error("container defined is in an undefined case...");
  }
  return containerCSS;
}
