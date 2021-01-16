import { MuxContainer } from "@/lib/MuxContainer.lib";

export class WebMux {
  root: MuxContainer;
  selectedWindowId!: string;

  // component level constructor 
  // [i.e. called after root element has been created]
  constructor(rootContainerRef: Element) {
    this.root = new MuxContainer(this, rootContainerRef, 0);
  }

  // make selected windows smaller in width
  // and add new window as column in selected window
  splitSelectedWindowVertical() {
    throw new Error("Method not implemented.");
  }

  // make selected windows smaller in height
  // and add new window as row in selected window
  splitSelectedWindowHorizontal() {
    throw new Error("Method not implemented.");
  }

  deleteSelectedWindow() {
    throw new Error("Method not implemented.");
  }

  setSelectedWindowId(windowId: string): void {
    this.selectedWindowId = windowId;
  }

  // given the selected window
  // go to the next window given the
  // users key input
  scrollSelectedWindow(direction: "UP" | "DOWN" | "LEFT" | "RIGHT") {
    switch (direction) {
      case "UP":
        break;
      case "DOWN":
        break;
      case "LEFT":
        break;
      case "RIGHT":
        break;
      default:
        break;
    }
  }
}
