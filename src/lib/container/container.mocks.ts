import { Container } from "./container.lib";

export const DEFAULT_CONTAINER: Container = {
    index: 0,
    id: "ROOT",
    children: [],
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
  }

export const TEST_CONTAINERS: Container[] = [
  {
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
  },
  {
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
        direction: "VERTICAL",
        scale: 1.0 / 3.0,
        children: [
            {
                index: 0,
                id: "child_three_one",
                size: { height: 0, width: 0, left: 0, top: 0 },
                direction: "VERTICAL",
                scale: 1.0 / 3.0,
                children: [],
            },
            {
                index: 1,
                id: "child_three_one",
                size: { height: 0, width: 0, left: 0, top: 0 },
                direction: "VERTICAL",
                scale: 1.0 / 3.0,
                children: [],
            },
            {
                index: 2,
                id: "child_three_one",
                size: { height: 0, width: 0, left: 0, top: 0 },
                direction: "VERTICAL",
                scale: 1.0 / 3.0,
                children: [],
            }
        ],
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
  }
];
