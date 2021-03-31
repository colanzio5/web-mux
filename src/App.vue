<template>
  <div class="root" ref="root">
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
import {
  Container,
  getContainerMemberIds,
} from "./lib/container/container.lib";
import { TEST_CONTAINERS } from "./lib/container/container.mocks";

@Options({
  components: {
    ContainerComponent,
  },
})
export default class App extends Vue {

  // ! temp state assignment for testing/dev
  // add from json to json classes for this
  container: Container = TEST_CONTAINERS[2];
  selectedContainerId?: string = getContainerMemberIds(this.container)[0]

  mounted() {
    window.addEventListener("keydown", this.keypressCallback);
  }

  beforeDestroy() {
    window.addEventListener("keydown", this.keypressCallback);
  }

  keypressCallback(event: any) {
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

  changeSelectedContainer(direction: string) {
    // eventually this should actually scroll to the container
    // in the direction you provide instead of just going to
    // the next id in the flattened id array
    const containers = getContainerMemberIds(this.container);
    const currentIdx = containers.findIndex(
      (e) => e == this.selectedContainerId
    );
    // circular array stuff
    const newIdx = 
      direction == "UP" ? (currentIdx + 1) % containers.length
      : direction == "DOWN" ? ((currentIdx-1 == -1) ? containers.length-1 : currentIdx-1)
      : 0;
    // if we have a next id to select, do it
    // otherwise do nothing
    this.selectedContainerId =
      currentIdx != undefined
        ? containers[newIdx]
        : this.selectedContainerId;
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
