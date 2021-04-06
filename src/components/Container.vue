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
import { Container } from "../lib/container/container.lib";
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
    return this.container.isWindow();
  }
  
  get getContainerStyle(): CSSProperties {
    const containerStyle = this.container.getContainerStyle();
    console.log("getContainerStyle...", containerStyle)
    return containerStyle;
  }
}
</script>
