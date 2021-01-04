import { v4 as uuid } from "uuid";

export type ILayoutMeta = {
  numberColumns: number;
  numberRows: number;
  maximumRows: number;
  maximumColumns: number;
  // these need to be set on layout create
  layoutWidth: number;
  layoutHeight: number;
  layoutLeftOffset: number;
  layoutTopOffset: number;
  // holds the state for active item
  selectedItemId: string;
};
export type ILayoutItem = {
  id: string;
  height: number;
  width: number;
  x: number;
  y: number;
};
export type ILayout = ILayoutItem[];

export class Layout {
  layoutMeta: ILayoutMeta = {
    numberColumns: 1,
    numberRows: 1,
    maximumRows: 3,
    maximumColumns: 3,
    layoutWidth: 0,
    layoutHeight: 0,
    layoutLeftOffset: 0,
    layoutTopOffset: 0,
    selectedItemId: "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed"
  };
  layoutItems: ILayout = [
    {
      id: "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed",
      height: 1,
      width: 1,
      x: 0,
      y: 0
    }
  ];

  // make selected windows smaller in width
  // and add new window as column in selected window
  splitVertical() {
    if (this.layoutMeta.numberColumns >= this.layoutMeta.maximumColumns)
      throw new Error("Splitting vertically exceeds maximum number of columns");
    // const currentWidth =
    //   this.layoutMeta.layoutWidth / this.layoutMeta.numberColumns;
    const newWidth =
      this.layoutMeta.layoutWidth / (this.layoutMeta.numberColumns + 1);
    const selectedItem = this.layoutItems.find(
      e => e.id === this.layoutMeta.selectedItemId
    ) as ILayoutItem;
    // resize and add new item
    // insert new item into layout
    // todo: enable insertion to left or right of selected layout item
    // todo: enable horizontal resize ONLY for items on same row
    const newItem = {
      id: uuid(),
      width: newWidth,
      height: this.layoutMeta.layoutHeight,
      x: selectedItem.x + 1,
      y: 0
    };
    this.layoutItems = this.layoutItems.concat(newItem);
    this.layoutMeta.selectedItemId = newItem.id;
    this.layoutMeta.numberColumns++;
    this.debugLayout();
  }

  // make selected windows smaller in height
  // and add new window as row in selected window
  splitHorizontal(selection: ILayoutItem) {
    throw new Error("Not Implemented!");
  }

  deleteItem() {
    throw new Error("Method not implemented.");
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
    // !temporary ignore direction selection
    const selectedIndex = this.layoutItems.findIndex(
      e => e.id === this.layoutMeta.selectedItemId
    );
    this.layoutMeta.selectedItemId = this.layoutItems[
      (selectedIndex + 1) % this.layoutItems.length
    ].id;
  }

  debugLayout() {
    console.log("--- START DEBUG LAYOUT --- ");
    for (const e of this.layoutItems) {
      console.log(
        `id(${e.id}) h: ${Math.trunc(e.height)} w: ${Math.trunc(
          e.width
        )} x: ${Math.trunc(e.x)} y:${Math.trunc(e.y)}`
      );
    }
    console.log(`selected item id(${this.layoutMeta.selectedItemId})`);
    console.log("--- END DEBUG LAYOUT --- ");
  }
}
