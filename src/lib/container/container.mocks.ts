import { Container, ContainerDirection } from "./container.lib";

import { v4 as uuid } from "uuid";

export const DEFAULT_CONTAINER: Container = {
  id: "ROOT",
  children: [],
  direction: ContainerDirection.HORIZONTAL,
  scale: 1.0,
  parentContainer: {
    id: "ROOT_PARENT",
    direction: ContainerDirection.UNDEFINED,
    scale: 1.0,
    children: [],
  },
};

export const TEST_CONTAINERS: Container[] = [
  {
    id: "ROOT",
    children: [
      {
        id: uuid(),
        direction: ContainerDirection.UNDEFINED,
        scale: 1.0 / 3.0,
        children: [],
      },
      {
        id: uuid(),
        direction: ContainerDirection.UNDEFINED,
        scale: 1.0 / 3.0,
        children: [],
      },
      {
        id: uuid(),
        direction: ContainerDirection.UNDEFINED,
        scale: 1.0 / 3.0,
        children: [],
      },
    ],
    direction: ContainerDirection.HORIZONTAL,
    scale: 1.0,
    parentContainer: {
      id: "ROOT_PARENT",
      direction: ContainerDirection.UNDEFINED,
      scale: 1.0,
      children: [],
    },
  },
  {
    id: "ROOT",
    children: [
      {
        id: uuid(),
        direction: ContainerDirection.UNDEFINED,
        scale: 1.0 / 3.0,
        children: [],
      },
      {
        id: uuid(),
        direction: ContainerDirection.UNDEFINED,
        scale: 1.0 / 3.0,
        children: [],
      },
      {
        id: uuid(),
        direction: ContainerDirection.VERTICAL,
        scale: 1.0 / 3.0,
        children: [
          {
            id: uuid(),
            direction: ContainerDirection.UNDEFINED,
            scale: 1.0 / 3.0,
            children: [],
          },
          {
            id: uuid(),
            direction: ContainerDirection.UNDEFINED,
            scale: 1.0 / 3.0,
            children: [],
          },
          {
            id: uuid(),
            direction: ContainerDirection.UNDEFINED,
            scale: 1.0 / 3.0,
            children: [],
          },
        ],
      },
    ],
    direction: ContainerDirection.HORIZONTAL,
    scale: 1.0,
    parentContainer: {
      id: "ROOT_PARENT",
      direction: ContainerDirection.UNDEFINED,
      scale: 1.0,
      children: [],
    },
  },
  {
    id: "ROOT",
    children: [
      {
        id: uuid(),
        direction: ContainerDirection.VERTICAL,
        scale: 1.0 / 2.0,
        children: [],
      },
      {
        id: uuid(),
        direction: ContainerDirection.HORIZONTAL,
        scale: 1.0 / 2.0,
        children: [
          {
            id: uuid(),
            direction: ContainerDirection.UNDEFINED,
            scale: 1.0 / 2.0,
            children: [],
          },
          {
            id: uuid(),
            direction: ContainerDirection.UNDEFINED,
            scale: 1.0 / 2.0,
            children: [],
          },
        ],
      },
    ],
    direction: ContainerDirection.VERTICAL,
    scale: 1.0,
    parentContainer: {
      id: "ROOT_PARENT",
      direction: ContainerDirection.UNDEFINED,
      scale: 1.0,
      children: [],
    },
  },
];
