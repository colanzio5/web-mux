import { CSSProperties } from "@vue/runtime-dom";

export const CONTAINER_BORDER_SIZE = 1;
export const WINDOW_BORDER_SIZE = 1;
export const CSS_PADDING_PIXEL_SIZE = 0;
export const CONTAINER_BORDER_COLOR = "yellow";
export const WINDOW_BORDER_COLOR = "yellow";

export type ContainerSize = {
  height: number;
  width: number;
  left: number;
  top: number;
};

export type Container = {
  id: string;
  children: Container[];
  direction: string;
  scale: number;

  // managed during vue runtime
  size: ContainerSize;
  index: number;
  parentContainer?: Container;
};

export function getContainerSizeAsCSS(
  container: Container,
  parentContainer: Container
): CSSProperties {
  const containerCSS: CSSProperties = {};
  switch (parentContainer.direction) {
    case "VERTICAL":
      containerCSS.display = "inline-block";
      containerCSS.height = "100%";
      containerCSS.width = (container.scale) * 100 + "%";
      break;
    case "HORIZONTAL":
      containerCSS.height = (container.scale) * 100 + "%";
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