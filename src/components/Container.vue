<template>
  <!-- check if data is loaded -->
  <div :style="getContainerStyle">
    <!-- if the container has no children, we render the window (recursive break) -->
    <WindowComponent v-if="isWindow" :container="container" />
    <!-- if container has children, render the children -->
    <Container
      v-else
      v-for="child of container.children"
      :key="child.id"
      :container="child"
      :parentContainer="container"
      v-model:selectedContainerId="_selectedContainerId"
    />
  </div>
</template>

<script lang="ts">
import { CSSProperties } from "@vue/runtime-dom";
import "reflect-metadata";
import { Vue, Options } from "vue-class-component";
import { Prop, PropSync } from "vue-property-decorator";
import {
  Container,
  CONTAINER_BORDER_SIZE,
  CONTAINER_BORDER_COLOR,
  getContainerSizeCSS,
} from "../lib/container/container.lib";
import WindowComponent from "./Window.vue";

@Options({
  name: "Container",
  components: {
    WindowComponent,
  },
})
export default class ContainerComponent extends Vue {
  @Prop({ required: true }) container!: Container;
  @Prop({ required: true }) parentContainer!: Container;
  @PropSync("selectedContainerId", { type: String })
  _selectedContainerId!: string;

  get isWindow(): boolean {
    return this.container.children && this.container.children.length == 0;
  }

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
