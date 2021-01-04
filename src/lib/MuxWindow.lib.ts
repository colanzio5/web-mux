import { ContainerDirectionEnum, MuxContainer } from "@/lib/MuxContainer.lib";
import { uuid } from "uuid";

export class MuxWindow {
  windowId: string;
  windowIdx: number;
  direction!: ContainerDirectionEnum;
  parentContainer: MuxContainer;

  constructor(parentContainer: MuxContainer, windowIdx: number) {
    this.parentContainer = parentContainer;
    this.windowId = uuid();
    this.windowIdx = windowIdx;
  }

  getContainerStyle() {
    const border =
      this.parentContainer.parentMux.selectedWindowId === this.windowId
        ? "1px solid red"
        : "1px solid purple";

    const numberWindowItems = this.parentContainer.getNumberContainerItems();
    switch (this.parentContainer.direction) {
      case ContainerDirectionEnum.UNSPECIFIED:
        return {
          width: this.parentContainer.containerWidth,
          height: this.parentContainer.containerHeight,
          top: this.parentContainer.containerTopOffset,
          left: this.parentContainer.containerLeftOffset
        };
      case ContainerDirectionEnum.VERTICAL:
        return {
          width: this.parentContainer.containerWidth,
          height: this.parentContainer.containerHeight / numberWindowItems,
          top:
            (this.parentContainer.containerHeight / numberWindowItems) *
            this.windowIdx,
          left: this.parentContainer.containerLeftOffset
        };
      case ContainerDirectionEnum.HORIZONTAL:
        return {
          width: this.parentContainer.containerWidth / numberWindowItems,
          height: this.parentContainer.containerHeight,
          top: this.parentContainer.containerTopOffset,
          left:
            (this.parentContainer.containerWidth / numberWindowItems) *
            this.windowIdx
        };
      default:
        throw new Error(
          "mux window parent container direction is undefined..."
        );
    }
  }
}

export function isMuxWindow(objectToCheck: unknown): objectToCheck is MuxWindow {
  return (<MuxWindow>objectToCheck).windowId !== undefined;
}