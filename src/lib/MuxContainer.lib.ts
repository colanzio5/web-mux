import { MuxWindow } from "@/lib/MuxWindow.lib";
import { WebMux } from "./WebMux.lib";
import { v4 as uuid } from "uuid";

export type MuxContainerChild = MuxContainer | MuxWindow;

export enum ContainerDirectionEnum {
  VERTICAL = "VERTICAL",
  HORIZONTAL = "HORIZONTAL",
  UNSPECIFIED = "UNSPECIFIED"
}

export class MuxContainer {
  // refrence to the root WebMux class controlling everything
  parentMux: WebMux;

  // container dimensions
  containerLeftOffset: number;
  containerTopOffset: number;
  containerWidth: number;
  containerHeight: number;

  // container tree properties
  containerId: string; // uuid
  direction: ContainerDirectionEnum = ContainerDirectionEnum.VERTICAL;
  containerChildren: MuxContainerChild[] = [];

  constructor(parentMux: WebMux, containerRef: Element) {
    // create a refrence to the root webmux instance
    this.parentMux = parentMux;
    // unique id and position in row or column
    this.containerId = uuid();
    // set the container size
    this.containerLeftOffset = containerRef.getBoundingClientRect().left;
    this.containerTopOffset = containerRef.getBoundingClientRect().top;
    this.containerWidth = containerRef.clientWidth;
    this.containerHeight = containerRef.clientHeight;
    // create one mux window by default
    this.containerChildren.push(new MuxWindow(this));
    this.containerChildren.push(new MuxWindow(this));
    this.containerChildren.push(new MuxWindow(this));
  }

  getNumberContainerItems(): number {
    return this.containerChildren.length;
  }

  resizeContainer(containerRef: Element): void {
    if (!containerRef) return;
    this.containerLeftOffset = containerRef.getBoundingClientRect().left;
    this.containerTopOffset = containerRef.getBoundingClientRect().top;
    this.containerWidth = containerRef.clientWidth;
    this.containerHeight = containerRef.clientHeight;
  }

  splitContainerVertical(): void {
    throw new Error("Not Implemented!");
  }
  splitContainerHorizontal(): void {
    throw new Error("Not Implemented!");
  }

  getContainerStyle(containerChildIdx: number) {
    const numberContainerItems = this.getNumberContainerItems();
    switch (this.direction) {
      case ContainerDirectionEnum.UNSPECIFIED:
        return {
          width: (this.containerWidth) + "px",
          height: (this.containerHeight) + "px",
          top: (this.containerTopOffset) + "px",
          left: (this.containerLeftOffset) + "px"
        };
      case ContainerDirectionEnum.VERTICAL:
        return {
          width: (this.containerWidth) + "px",
          height: (this.containerHeight / numberContainerItems) + "px",
          top: ((this.containerHeight / numberContainerItems) * containerChildIdx) + "px",
          left: (this.containerLeftOffset) + "px"
        };
      case ContainerDirectionEnum.HORIZONTAL:
        return {
          width: (this.containerWidth / numberContainerItems) + "px",
          height: (this.containerHeight) + "px",
          top: (this.containerTopOffset) + "px",
          left: ((this.containerWidth / numberContainerItems) * containerChildIdx) + "px"
        };
      default:
        throw new Error(
          "mux window parent container direction is undefined..."
        );
    }
  }
}

// todo: this should somehow check agains all MuxContainer required properties
export function isMuxContainer(
  objectToCheck: unknown
): objectToCheck is MuxContainer {
  return (objectToCheck as MuxContainer).containerId !== undefined;
}

// ! some save/depreciated code for future ref
// // one container with one window
// export const DEFAULT_WINDOW = {
//   id: uuid(),
//   h: 0,
//   w: 0,
//   x: 0,
//   y: 0,
//   children: [],
//   layoutItemMeta: {
//     layoutHeight: 0,
//     layoutWidth: 0,
//     layoutLeftOffset: 0,
//     layoutTopOffset: 0,
//     numberColumns: 1,
//     numberRows: 1,
//   }
// };

// // one container split into two windows
// export const MOCK_SIMPLE_LAYOUT_1 = {
//   id: uuid(),
//   h: 600,
//   w: 800,
//   x: 0,
//   y: 0,
//   children: [
//     {
//       id: uuid(),
//       h: 600,
//       w: 400,
//       x: 0,
//       y: 0,
//       children: []
//     },
//     {
//       id: uuid(),
//       h: 600,
//       w: 400,
//       x: 400,
//       y: 0,
//       children: []
//     }
//   ]
// };

// // make selected windows smaller in width
// // and add new window as column in selected window
// splitVertical() {
//   if (this.layoutMeta.numberColumns >= this.layoutMeta.maximumColumns)
//     throw new Error("Splitting vertically exceeds maximum number of columns");
//   // const currentWidth =
//   //   this.layoutMeta.layoutWidth / this.layoutMeta.numberColumns;
//   const newWidth =
//     this.layoutMeta.layoutWidth / (this.layoutMeta.numberColumns + 1);
//   const selectedItem = this.layoutItems.find(
//     e => e.id === this.layoutMeta.selectedItemId
//   ) as ILayoutItem;
//   // resize and add new item
//   // insert new item into layout
//   // todo: enable insertion to left or right of selected layout item
//   // todo: enable horizontal resize ONLY for items on same row
//   const newItem = {
//     id: uuid(),
//     width: newWidth,
//     height: this.layoutMeta.layoutHeight,
//     x: selectedItem.x + 1,
//     y: 0
//   };
//   this.layoutItems = this.layoutItems.concat(newItem);
//   this.layoutMeta.selectedItemId = newItem.id;
//   this.layoutMeta.numberColumns++;
//   this.debugLayout();
// }
