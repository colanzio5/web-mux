<template>
  <div class="root" ref="root">
    <ContainerComponent
      :index="container.index"
      :id="container.id"
      :container="container"
      :parentContainer="container.parentContainer"
    />
  </div>
</template>

<script lang="ts">
import "reflect-metadata";
import { Vue, Options } from "vue-class-component";
import ContainerComponent from "./components/Container.vue";
import { Container, ContainerSize } from "./lib/container/container.lib";
import { TEST_CONTAINERS } from "./lib/container/container.mocks"

@Options({
  components: {
    ContainerComponent,
  },
})
export default class App extends Vue {
  container: Container = TEST_CONTAINERS[2];

  mounted(): void {
    window.addEventListener("resize", this.resizeRootContainer);
    this.resizeRootContainer({} as Event);
  }

  beforeDestroy() {
    window.addEventListener("resize", this.resizeRootContainer);
  }

  resizeRootContainer(_: Event): void {
    const rootRef: HTMLElement = this.$refs.root as HTMLElement;
    const containerSize: ContainerSize = {
      height: rootRef.clientHeight,
      width: rootRef.clientWidth,
      left: rootRef.clientLeft,
      top: rootRef.clientTop,
    };
    // todo: we have to do this if statement
    // because parentContainer is defined as | undefined in type
    if (this.container.parentContainer)
      this.container.parentContainer.size = containerSize;
    this.container.size = containerSize;
  }
}
</script>

<style>
.root {
  background: black;
  position: absolute;
  box-sizing: border-box;
  /* border: 1px solid yellow; */
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
}
</style>
