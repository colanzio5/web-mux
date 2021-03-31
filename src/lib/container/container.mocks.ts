import { Container } from "./container.lib";
import { v4 as uuid } from "uuid";

export const DEFAULT_CONTAINER: Container = {
  id: "ROOT",
  children: [],
  direction: "HORIZONTAL",
  scale: 1.0,
  parentContainer: {
    id: "ROOT_PARENT",
    direction: "UNDEFINED",
    scale: 1.0,
    children: [],
  } as Container,
};

export const TEST_CONTAINERS: Container[] = [
  {
    id: "ROOT",
    children: [
      {
        id: uuid(),
        direction: "HORIZONTAL",
        scale: 1.0 / 3.0,
        children: [],
      },
      {
        id: uuid(),
        direction: "HORIZONTAL",
        scale: 1.0 / 3.0,
        children: [],
      },
      {
        id: uuid(),
        direction: "HORIZONTAL",
        scale: 1.0 / 3.0,
        children: [],
      },
    ],
    direction: "HORIZONTAL",
    scale: 1.0,
    parentContainer: {
      id: "ROOT_PARENT",
      direction: "UNDEFINED",
      scale: 1.0,
      children: [],
    } as Container,
  },
  {
    id: "ROOT",
    children: [
      {
        id: uuid(),
        direction: "HORIZONTAL",
        scale: 1.0 / 3.0,
        children: [],
      },
      {
        id: uuid(),
        direction: "HORIZONTAL",
        scale: 1.0 / 3.0,
        children: [],
      },
      {
        id: uuid(),
        direction: "VERTICAL",
        scale: 1.0 / 3.0,
        children: [
          {
            id: uuid(),
            direction: "VERTICAL",
            scale: 1.0 / 3.0,
            children: [],
          },
          {
            id: uuid(),
            direction: "VERTICAL",
            scale: 1.0 / 3.0,
            children: [],
          },
          {
            id: uuid(),
            direction: "VERTICAL",
            scale: 1.0 / 3.0,
            children: [],
          },
        ],
      },
    ],
    direction: "HORIZONTAL",
    scale: 1.0,
    parentContainer: {
      id: "ROOT_PARENT",
      direction: "UNDEFINED",
      scale: 1.0,
      children: [],
    } as Container,
  },
  {
    id: "ROOT",
    children: [
      {
        id: uuid(),
        direction: "VERTICAL",
        scale: 1.0 / 2.0,
        children: [],
      },
      {
        id: uuid(),
        direction: "HORIZONTAL",
        scale: 1.0 / 2.0,
        children: [
          {
            id: uuid(),
            direction: "HORIZONTAL",
            scale: 1.0 / 2.0,
            children: [],
          },
          {
            id: uuid(),
            direction: "HORIZONTAL",
            scale: 1.0 / 2.0,
            children: [],
          },
        ],
      },
    ],
    direction: "VERTICAL",
    scale: 1.0,
    parentContainer: {
      id: "ROOT_PARENT",
      direction: "UNDEFINED",
      scale: 1.0,
      children: [],
    } as Container,
  },
];
