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

export enum ContainerDirection {
  VERTICAL = "VERTICAL",
  HORIZONTAL = "HORIZONTAL",
  UNDEFINED = "UNDEFINED",
}

export function getContainerSizeCSS(
  container: Container,
  parentContainer: Container
): CSSProperties {
  const containerCSS: CSSProperties = {};
  switch (parentContainer.direction) {
    case ContainerDirection.VERTICAL:
      containerCSS.display = "inline-block"; // required only for the vertical case
      containerCSS.height = "100%";
      containerCSS.width = container.scale * 100 + "%";
      break;
    case ContainerDirection.HORIZONTAL:
      containerCSS.height = container.scale * 100 + "%";
      containerCSS.width = "100%";
      break;
    case ContainerDirection.UNDEFINED:
      containerCSS.height = "100%";
      containerCSS.width = "100%";
      break;
    default:
      console.error("container defined is in an undefined case...");
  }
  return containerCSS;
}

export function getContainerMemberIds(container: Container): string[] {
  // from https://stackoverflow.com/questions/54245284/recursive-map-function
  const transform = ({ id, children }: Container): string[] => {
    const member: string [] = [];
    // only process as member if isWindow
    // i.e. children.length == 0
    if(children.length == 0) member.push(id);
    return [ ...member, ...transformAll(children)];
  };
  const transformAll = (children: Container[]) => {
    return children.flatMap((c: Container) => transform(c));
  };
  return transformAll([container]);
}
