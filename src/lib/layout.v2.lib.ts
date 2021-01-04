import { v4 as uuid } from "uuid";

export const DEFAULT_WINDOW = {
  id: uuid(),
  h: 0,
  w: 0,
  x: 0,
  y: 0,
  children: [],
  layoutItemMeta: {
    layoutHeight: 0,
    layoutWidth: 0,
    layoutLeftOffset: 0,
    layoutTopOffset: 0,
    numberColumns: 1,
    numberRows: 1,
  }
};

interface IlayoutItemMeta {
  layoutWidth: number;
  layoutHeight: number;
  layoutLeftOffset: number;
  layoutTopOffset: number;
  numberColumns: number;
  numberRows: number;
}

export default class Layout {
  id: string = DEFAULT_WINDOW.id;
  h: number = DEFAULT_WINDOW.h;
  w: number = DEFAULT_WINDOW.w;
  x: number = DEFAULT_WINDOW.x;
  y: number = DEFAULT_WINDOW.y;
  children: Layout[] = DEFAULT_WINDOW.children;
  layoutItemMeta: IlayoutItemMeta = DEFAULT_WINDOW.layoutItemMeta;

  // make selected windows smaller in width
  // and add new window as column in selected window
  splitVertical() {
    throw new Error("Method not implemented.");
  }

  // make selected windows smaller in height
  // and add new window as row in selected window
  splitHorizontal() {
    throw new Error("Method not implemented.");
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
  }
}

export const MOCK_SIMPLE_LAYOUT_1 = {
  id: uuid(),
  h: 600,
  w: 800,
  x: 0,
  y: 0,
  children: [
    {
      id: uuid(),
      h: 600,
      w: 400,
      x: 0,
      y: 0,
      children: []
    },
    {
      id: uuid(),
      h: 600,
      w: 400,
      x: 400,
      y: 0,
      children: []
    }
  ]
};
