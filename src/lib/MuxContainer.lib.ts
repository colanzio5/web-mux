import { MuxWindow } from "@/lib/MuxWindow.lib";
import { WebMux } from "./WebMux.lib";
import { uuid } from "uuid";

export type MuxContainerChildren = MuxContainer[] | MuxWindow[];

export enum ContainerDirectionEnum {
  VERTICAL = "VERTICAL",
  HORIZONTAL = "HORIZONTAL",
  UNSPECIFIED = "UNSPECIFIED"
}

export class MuxContainer {
  // refrence to the root WebMux class controlling everything
  parentMux: WebMux;

  // container dimensions
  containerLeftOffset!: number;
  containerTopOffset!: number;
  containerWidth!: number;
  containerHeight!: number;

  // container tree properties
  id: string;
  direction: ContainerDirectionEnum = ContainerDirectionEnum.UNSPECIFIED;
  containerChildren: MuxContainerChildren = [new MuxWindow(this, 0)];

  constructor(parentMux: WebMux, containerRef: Element) {
    this.id = uuid();
    this.resizeContainer(containerRef);
    this.parentMux = parentMux;
  }

  getNumberContainerItems(): number {
    return this.containerChildren.length;
  }

  resizeContainer(containerRef: Element): void {
    this.containerLeftOffset = containerRef.getBoundingClientRect().left;
    this.containerTopOffset = containerRef.getBoundingClientRect().top;
    this.containerWidth = containerRef.clientWidth;
    this.containerHeight = containerRef.clientHeight;
  }

  splitContainerVertical() {}
  splitContainerHorizontal() {}
}


export const isMuxContainer = (objectToCheck: unknown): boolean => {
  return objectToCheck instanceof MuxContainer
}