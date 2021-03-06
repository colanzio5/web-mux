import { Component as VueComponent, CSSProperties } from "@vue/runtime-dom";
import { v4 as uuid } from "uuid";

export const CONTAINER_BORDER_SIZE = 0;
export const WINDOW_BORDER_SIZE = 1;
export const CONTAINER_BORDER_COLOR = "black";
export const WINDOW_BORDER_COLOR = "white";

export enum ContainerDirection {
  VERTICAL = "VERTICAL",
  HORIZONTAL = "HORIZONTAL",
  UNDEFINED = "UNDEFINED",
}

export interface IContainerOptions {
  id?: string;
  direction?: ContainerDirection;
  scale?: number;
  children?: Container[];
  // managed during vue runtime
  parentContainer?: Container;
  component?: VueComponent;
}

export interface IContainer {
  id: string;
  direction: ContainerDirection;
  scale: number;
  children: Container[];
  // managed during vue runtime
  parentContainer?: Container;
  component?: VueComponent;
}

export class Container implements IContainer {
  id: string;
  direction: ContainerDirection;
  scale: number;
  children: Container[] = [];
  // managed during vue runtime
  parentContainer?: Container;
  component?: VueComponent;

  constructor(options: IContainerOptions) {
    this.id = options?.id || uuid();
    this.direction = options?.direction || ContainerDirection.UNDEFINED;
    this.scale = options?.scale || 1.0;
    this.children = options?.children || [];
    this.parentContainer = options?.parentContainer;
    this.component = options?.component;
    // assign parent container to children if given
    // ! this can be avoided if we come up with user drive methods for building layouts
    // ! for now we need this when creating templates from JSON/IContainerOptions
    this.children.forEach((c) => (c.parentContainer = this));
  }

  /** User Interface Methods */
  splitContainer(direction: "VERTICAL" | "HORIZONTAL" | "UNDEFINED"): void {
    console.log("splitContainer", direction);
    switch (direction) {
      case "VERTICAL":
        break;
      case "HORIZONTAL":
        break;
      case "UNDEFINED":
        break;
      default:
        console.error("splitContainer direction not instantiated...");
    }
  }

  /** Helper Methods */
  isWindow(): boolean {
    return this.children && this.children.length == 0;
  }

  /** CSS Styling Methods */
  getContainerStyle(): CSSProperties {
    const containerSizeCSS: CSSProperties = this._getContainerSizeCSS();
    const containerStyle: CSSProperties = {
      border: `${CONTAINER_BORDER_SIZE}px solid ${CONTAINER_BORDER_COLOR}`,
      boxSizing: "border-box",
      verticalAlign: "top", // required to keep window styles from shifting when contents are added
      ...containerSizeCSS,
    };
    return containerStyle;
  }

  /**
   * return the height, width, top, and left properties of the container
   * @returns CSSProperties
   */
  _getContainerSizeCSS(): CSSProperties {
    const containerCSS: CSSProperties = {};
    switch (this.parentContainer?.direction) {
      case ContainerDirection.VERTICAL:
        containerCSS.display = "inline-block"; // required only for the vertical case
        containerCSS.height = "100%";
        containerCSS.width = this.scale * 100 + "%";
        break;
      case ContainerDirection.HORIZONTAL:
        containerCSS.height = this.scale * 100 + "%";
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

  /**
   * returns a list of all the descendent container ids
   * if called on the root container, will return list of id's of all containers
   */
  getContainerMemberIds(): string[] {
    // from https://stackoverflow.com/questions/54245284/recursive-map-function
    const transform = ({ id, children }: Container): string[] => {
      const member: string[] = [];
      // only process as member if isWindow
      // i.e. children.length == 0
      if (children.length == 0) member.push(id);
      return [...member, ...transformAll(children)];
    };
    const transformAll = (children: Container[]) => {
      return children.flatMap((c: Container) => transform(c));
    };
    return transformAll([this]);
  }
}
