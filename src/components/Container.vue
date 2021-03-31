<template>
  <!-- check if data is loaded -->
  <div v-if="container.children" :style="getContainerStyle">
    <!-- if the container has no children, we render the window (recursive break) -->
    <div v-if="container.children.length == 0" :style="getWindowStyle">
      <div style="color: white">{{ container.id }}</div>
    </div>
    <!-- if container has children, render the children -->
    <Container
      v-else
      v-for="child of container.children"
      :key="child.id"
      :container="child"
      :parentContainer="container"
    />
  </div>
</template>

<script lang="ts">
import { CSSProperties } from "@vue/runtime-dom";
import "reflect-metadata";
import { Vue, Options } from "vue-class-component";
import { Prop } from "vue-property-decorator";
import {
  Container,
  CONTAINER_BORDER_SIZE,
  CONTAINER_BORDER_COLOR,
  WINDOW_BORDER_SIZE,
  WINDOW_BORDER_COLOR,
  getContainerSizeCSS,
} from "../lib/container/container.lib";

@Options({
  name: "Container",
})
export default class ContainerComponent extends Vue {
  @Prop({ required: true }) container!: Container;
  @Prop({ required: true }) parentContainer!: Container;

  get getContainerStyle(): CSSProperties {
    const containerSizeCSS: CSSProperties = getContainerSizeCSS(
      this.container,
      this.parentContainer
    );
    const containerStyle: CSSProperties = {
      border: `${CONTAINER_BORDER_SIZE}px solid ${CONTAINER_BORDER_COLOR}`,
      boxSizing: "border-box",
      verticalAlign: "top", // required to keep window styles from shifting when contents are added
      ...containerSizeCSS,
    };
    return containerStyle;
  }

  get getWindowStyle(): CSSProperties {
    const windowStyle: CSSProperties = {
      border: `${WINDOW_BORDER_SIZE}px solid ${WINDOW_BORDER_COLOR}`,
      boxSizing: "border-box",
      height: "100%",
      width: "100%",
    };
    return windowStyle;
  }

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
}
</script>
