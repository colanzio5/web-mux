<template>
  <!-- check if data is loaded -->
  <div v-if="container.children" :style="getContainerStyle">
    <!-- if the container has no children, we render the window (recursive break) -->
    <div v-if="container.children.length == 0" :style="getWindowStyle"></div>
    <!-- if container has children, render the children -->
    <Container
      v-else
      v-for="(child, idx) in container.children"
      :key="idx"
      :index="idx"
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
  getContainerSizeAsCSS,
  CONTAINER_BORDER_SIZE,
  CONTAINER_BORDER_COLOR,
  WINDOW_BORDER_SIZE,
  WINDOW_BORDER_COLOR,
} from "../lib/container/container.lib";

@Options({
  name: "Container",
})
export default class ContainerComponent extends Vue {
  @Prop({ required: true }) index!: number;
  @Prop({ required: true }) container!: Container;
  @Prop({ required: true }) parentContainer!: Container;

  mounted(): void {
    this.resizeContainer({} as Event);
    window.addEventListener("resize", this.resizeContainer);
  }

  beforeDestroy() {
    window.addEventListener("resize", this.resizeContainer);
  }

  // todo: this shouldn't have to be called, should be reactive,
  // todo: or at least be triggered by parent event call
  resizeContainer(_: Event) {
    console.log("setting size of container from resize event", this.container);
  }

  get getContainerStyle(): CSSProperties {
    const containerStyle: CSSProperties = {
      boxSizing: "border-box",
      border: `${CONTAINER_BORDER_SIZE}px solid ${CONTAINER_BORDER_COLOR}`,
      ...getContainerSizeAsCSS(this.container, this.parentContainer),
    };
    console.log("get container style...", containerStyle);
    return containerStyle;
  }

  get getWindowStyle(): CSSProperties {
    const windowStyle: CSSProperties = {
      position: "relative",
      border: `${WINDOW_BORDER_SIZE}px solid ${WINDOW_BORDER_COLOR}`,
      boxSizing: "border-box",
      height: "100%",
      width: "100%",
    };
    console.log("get window style...", windowStyle);
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
