<template>
  <div class="root" ref="root">
    <ContainerComponent
      :index="container.index"
      :id="container.id"
      :container="container"
      :parentContainer="container.parentContainer"
    />
  </div>
  <button>split</button>
  <button>reset</button>
</template>

<script lang="ts">
import "reflect-metadata";
import { Vue, Options } from "vue-class-component";
import ContainerComponent from "./components/Container.vue";
import {
  Container,
  ContainerSize,
  getContainerSize,
  DEFAULT_CONTAINER,
  getContainerSizeAsCSS,
} from "./lib/container.lib";

@Options({
  components: {
    ContainerComponent,
  },
})
export default class App extends Vue {
  container: Container = DEFAULT_CONTAINER;

  mounted(): void {
    this.resizeRootContainer({} as Event);
    window.addEventListener("resize", this.resizeRootContainer);
  }

  beforeDestroy() {
    window.addEventListener("resize", this.resizeRootContainer);
  }

  resizeRootContainer(event: Event) {
    const rootRef: HTMLElement = this.$refs.root as HTMLElement;
    const rootElementSize: ContainerSize = {
      height: rootRef.clientHeight,
      width: rootRef.clientWidth,
      left: rootRef.clientLeft,
      top: rootRef.clientTop,
    };
    const parentContainerSize = getContainerSize(
      this.container.parentContainer as Container,
      {
        index: 0,
        id: "ROOT_PARENT",
        direction: "UNDEFINED",
        scale: 1.0,
        size: rootElementSize,
        children: [],
      }
    );
    (this.container.parentContainer as Container).size = parentContainerSize;

    this.container.size = getContainerSize(
      this.container,
      this.container.parentContainer as Container
    );
    console.log(
      "setting size of container from resize event",
      this.container,
      event
    );
  }
}
</script>

<style>
.root {
  position: absolute;
  border: 2px solid purple;
  height: 50vh;
  width: 70vw;
  left: 50px;
  top: 50px;
}
</style>
