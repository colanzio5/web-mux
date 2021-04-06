<template>
  <div
    @click="_selectedContainerId = container.id"
    :style="getWindowStyle"
    class="window"
  >
    <div>{{ container.id }}</div>
  </div>
</template>

<script lang="ts">
import "reflect-metadata";
import { CSSProperties } from "@vue/runtime-dom";
import { Vue, Options } from "vue-class-component";
import { Prop, PropSync } from "vue-property-decorator";
import {
  Container,
  WINDOW_BORDER_SIZE,
  WINDOW_BORDER_COLOR,
} from "../lib/container/container.lib";

@Options({
  name: "WindowComponent",
  emits: ["update:selectedContainerId"], // so vue doesnt throw error in browser,
})
export default class WindowComponent extends Vue {
  @Prop({ required: true }) container!: Container;
  @PropSync("selectedContainerId", { type: String })
  _selectedContainerId!: string;

  get getWindowStyle(): CSSProperties {
    const windowColor = this.isWindowSelected ? "red" : WINDOW_BORDER_COLOR;
    const windowStyle: CSSProperties = {
      border: `${WINDOW_BORDER_SIZE}px solid ${windowColor}`,
      // color: "white",
      boxSizing: "border-box",
      height: "100%",
      width: "100%",
    };
    return windowStyle;
  }

  get isWindowSelected(): boolean {
    return this._selectedContainerId == this.container.id;
  }
}
</script>

<style scoped>
.xterm-helper-textarea {
  border: 0px;
}
</style>