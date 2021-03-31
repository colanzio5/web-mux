import { CSSProperties } from "@vue/runtime-dom";

export const CSS_BORDER_PIXEL_SIZE = 2;
export const CSS_PADDING_PIXEL_SIZE = 1;

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

export const DEFAULT_CONTAINER: Container = {
  index: 0,
  id: "ROOT",
  children: [
    {
      index: 0,
      id: "child_one",
      size: { height: 0, width: 0, left: 0, top: 0 },
      direction: "HORIZONTAL",
      scale: 1.0 / 3.0,
      children: [],
    },
    {
      index: 1,
      id: "child_two",
      size: { height: 0, width: 0, left: 0, top: 0 },
      direction: "HORIZONTAL",
      scale: 1.0 / 3.0,
      children: [],
    },
    {
      index: 2,
      id: "child_three",
      size: { height: 0, width: 0, left: 0, top: 0 },
      direction: "HORIZONTAL",
      scale: 1.0 / 3.0,
      children: [],
    },
  ],
  direction: "HORIZONTAL",
  scale: 1.0,
  size: { height: 0, width: 0, left: 0, top: 0 },
  parentContainer: {
    index: 0,
    id: "ROOT_PARENT",
    direction: "UNDEFINED",
    scale: 1.0,
    size: { height: 0, width: 0, left: 0, top: 0 },
    children: [],
  } as Container,
};

export function getContainerSize(
  container: Container,
  parentContainer: Container
): ContainerSize {
  const containerSize: ContainerSize = { height: 0, width: 0, left: 0, top: 0 };

  // to calculate top or width offset (depending on container direction)
  // we need to collect the container's siblings sizes
  const numberOfSiblings = parentContainer.children.length || 0;
  const sizeOfSiblings = parentContainer.children
    .filter((e) => e.index > container.index)
    .map((e) => {
      switch (parentContainer.direction) {
        case "VERTICAL":
          return e.scale * parentContainer.size.width;
        case "HORIZONTAL":
          return e.scale * parentContainer.size.height;
        case "UNDEFINED":
          return 0;
        default:
          console.error(
            "container collect sibling sizes reached undefined case"
          );
          return 0;
      }
    })
    .reduce((a, c) => a + c, 0);

  // output container dimensions depending on
  // parent container's split direction
  // remember there are two borders per dimension 
  // (i.e. top and bottom for height, left and right for bottom)
  const borderSize = (CSS_BORDER_PIXEL_SIZE) + (CSS_PADDING_PIXEL_SIZE);
  switch (parentContainer.direction) {
    case "VERTICAL":
      containerSize.height = parentContainer.size.height - borderSize;
      containerSize.width =
        parentContainer.size.width * container.scale - borderSize;
      containerSize.top = parentContainer.size.top;
      containerSize.left = parentContainer.size.left + sizeOfSiblings;
      break;
    case "HORIZONTAL":
      containerSize.width = parentContainer.size.width - borderSize;
      containerSize.height =
        parentContainer.size.height * container.scale - (borderSize * (numberOfSiblings));
      containerSize.left = parentContainer.size.left;
      containerSize.top = parentContainer.size.top + sizeOfSiblings;
      break;
    case "UNDEFINED":
      containerSize.height = parentContainer.size.height - borderSize;
      containerSize.width = parentContainer.size.width - borderSize;
      containerSize.top = parentContainer.size.top;
      containerSize.left = parentContainer.size.left;
      break;
    default:
      console.error("container defined is in an undefined case...");
  }
  return containerSize;
}

export function getContainerSizeAsCSS(size: ContainerSize): CSSProperties {
  return {
    height: size.height + "px",
    width: size.width + "px",
    top: size.top + "px",
    left: size.left + "px",
  };
}
