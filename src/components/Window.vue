<template>
  <div v-if="activeComponent" @click="_selectedContainerId = container.id" :style="getWindowStyle">
    <component :is="activeComponent" :container="container"></component>
  </div>
</template>

<script lang="ts">
import "reflect-metadata";
import { CSSProperties, Component as VueComponent} from "@vue/runtime-dom";
import { Vue, Options } from "vue-class-component";
import { Prop, PropSync } from "vue-property-decorator";
import {
  Container,
  WINDOW_BORDER_SIZE,
  WINDOW_BORDER_COLOR,
} from "../lib/container/container.lib";

// ! reading on dynamically mounting components
// todo: need to create proxyElement vue component to abstract passing activeComponent AND props
// ! how is two way binding going to work
// https://stackoverflow.com/questions/43799416/dynamically-mount-a-single-file-component-in-vue-js
import DefaultWindowComponent from "@/components/windows/Default.vue";
import CanvasWindowComponent from "@/components/windows/Canvas.vue";

@Options({
  name: "WindowComponent",
  emits: ["update:selectedContainerId"], // so vue doesnt throw error in browser,
  components: {
    DefaultWindowComponent,
    CanvasWindowComponent
  }
})
// todo Window could use it's own class if needed...
export default class WindowComponent extends Vue {
  @Prop({ required: true }) container!: Container;
  @PropSync("selectedContainerId", { type: String })
  _selectedContainerId!: string;

  get activeComponent(): VueComponent {
    const selectedComponent =  this.container.component ? this.container.component : DefaultWindowComponent
    console.log(this.container.component, selectedComponent);
    return selectedComponent;
  }

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

  selectContainer() {
    this._selectedContainerId = this.container.id;
  }
}
</script>
