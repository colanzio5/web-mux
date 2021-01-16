import { ContainerDirectionEnum, MuxContainer } from "@/lib/MuxContainer.lib";
import { v4 as uuid } from "uuid";

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

  getWindowStyle() {
    return {
      border:
        this.parentContainer.parentMux.selectedWindowId === this.windowId
          ? "1px solid red"
          : "1px solid purple",
      size: this.parentContainer.getContainerStyle()
    };
  }
}

export function isMuxWindow(
  objectToCheck: unknown
): objectToCheck is MuxWindow {
  console.log("isMuxWindow", objectToCheck);
  return (objectToCheck as MuxWindow).windowId !== undefined;
}
