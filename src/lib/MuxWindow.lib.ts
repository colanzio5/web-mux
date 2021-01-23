import { ContainerDirectionEnum, MuxContainer } from "@/lib/MuxContainer.lib";
import { v4 as uuid } from "uuid";

export class MuxWindow {
  windowId: string;
  direction!: ContainerDirectionEnum;
  parentContainer: MuxContainer;

  constructor(parentContainer: MuxContainer) {
    this.parentContainer = parentContainer;
    this.windowId = uuid();
  }

  getWindowStyle(containerChildIdx: number) {
    return {
      border:
        this.parentContainer.parentMux.selectedWindowId === this.windowId
          ? "1px solid red"
          : "1px solid purple",
      // inherit size paramaters from parent container
      ...this.parentContainer.getContainerStyle(containerChildIdx)
    };
  }
}

// todo: this should somehow check agains all MuxWindow required properties
export function isMuxWindow(
  objectToCheck: unknown
): objectToCheck is MuxWindow {
  return (objectToCheck as MuxWindow).windowId !== undefined;
}
