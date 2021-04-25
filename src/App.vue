<template>
  <div class="root" ref="root" @keypress="keypressCallback">
    <ContainerComponent
      :id="container.id"
      :container="container"
      :parentContainer="container.parentContainer"
      :selectedContainerId="selectedContainerId"
    />
  </div>
</template>

<script lang="ts">
import "reflect-metadata";
import { Vue, Options } from "vue-class-component";
import ContainerComponent from "./components/Container.vue";
import { Container } from "./lib/container/container.lib";
import { DEFAULT_CONTAINER, TEST_CONTAINERS } from "./lib/container/container.mocks";

@Options({
  components: {
    ContainerComponent,
  },
})
export default class App extends Vue {
  // ! temp state assignment for testing/dev
  // add from json to json classes for this
  container: Container = DEFAULT_CONTAINER;
  selectedContainerId?: string = this.container.getContainerMemberIds()[0];

  mounted() {
    console.log(this.selectedContainerId)
  }

  keypressCallback(event: KeyboardEvent): void {
    switch (event.keyCode) {
      case 39:
        this.changeSelectedContainer("UP");
        break;
      case 37:
        this.changeSelectedContainer("DOWN");
        break;
      default:
        console.log("case not implemented for event keycode: ", event.keyCode);
    }
  }

  changeSelectedContainer(direction: string): void {
    // eventually this should actually scroll to the container
    // in the direction you provide instead of just going to
    // the next id in the flattened id array
    const containers = this.container.getContainerMemberIds();
    const currentIdx = containers.findIndex(
      (e) => e == this.selectedContainerId
    );
    // circular array stuff
    const newIdx =
      direction == "UP"
        ? (currentIdx + 1) % containers.length
        : direction == "DOWN"
        ? currentIdx - 1 == -1
          ? containers.length - 1
          : currentIdx - 1
        : 0;
    // if we have a next id to select, do it
    // otherwise do nothing
    this.selectedContainerId =
      currentIdx != undefined ? containers[newIdx] : this.selectedContainerId;
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
  color: white;
}
</style>
