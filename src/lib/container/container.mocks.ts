import { Container, ContainerDirection } from "./container.lib";

const ROOT_PARENT = new Container({ id: "ROOT_PARENT" });
const ROOT_ID = "ROOT";

export const DEFAULT_CONTAINER = new Container({
  id: ROOT_ID,
  direction: ContainerDirection.UNDEFINED,
  parentContainer: ROOT_PARENT,
});

export const TEST_CONTAINERS: Container[] = [
  // test container 1
  new Container({
    id: ROOT_ID,
    children: [
      new Container({ scale: 1.0 / 3.0 }),
      new Container({ scale: 1.0 / 3.0 }),
      new Container({ scale: 1.0 / 3.0 }),
    ],
    direction: ContainerDirection.HORIZONTAL,
    parentContainer: ROOT_PARENT,
  }),
  // test container 2
  new Container({
    id: ROOT_ID,
    children: [
      new Container({ scale: 1.0 / 3.0 }),
      new Container({ scale: 1.0 / 3.0 }),
      new Container({
        direction: ContainerDirection.VERTICAL,
        scale: 1.0 / 3.0,
        children: [
          new Container({ scale: 1.0 / 3.0 }),
          new Container({ scale: 1.0 / 3.0 }),
          new Container({ scale: 1.0 / 3.0 }),
        ],
      }),
    ],
    direction: ContainerDirection.HORIZONTAL,
    parentContainer: ROOT_PARENT,
  }),
  // test container 3
  new Container({
    id: ROOT_ID,
    children: [
      new Container({
        direction: ContainerDirection.VERTICAL,
        scale: 1.0 / 2.0,
      }),
      new Container({
        direction: ContainerDirection.HORIZONTAL,
        scale: 1.0 / 2.0,
        children: [
          new Container({ scale: 1.0 / 2.0 }),
          new Container({ scale: 1.0 / 2.0 }),
        ],
      }),
    ],
    direction: ContainerDirection.VERTICAL,
    parentContainer: ROOT_PARENT,
  }),
];
