<template>
  <div
    @click="emit()"
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
// todo Window could use it's own class if needed...
export default class WindowComponent extends Vue {
  @Prop({ required: true }) container!: Container;
  @PropSync("selectedContainerId", { type: String })
  _selectedContainerId!: string;

  get getWindowStyle(): CSSProperties {
    const windowColor =
      this._selectedContainerId === this.container.id
        ? "red"
        : WINDOW_BORDER_COLOR;
    const windowStyle: CSSProperties = {
      border: `${WINDOW_BORDER_SIZE}px solid ${windowColor}`,
      boxSizing: "border-box",
      height: "100%",
      width: "100%",
    };
    return windowStyle;
  }

  emit() {
    console.log(this._selectedContainerId)
    this._selectedContainerId = this.container.id
  }
}
</script>

<style scoped>
.xterm-helper-textarea {
  border: 0px;
}
</style>
