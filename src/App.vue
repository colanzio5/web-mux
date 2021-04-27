<template>
  <div class="webmux">
    <div class="root-container" ref="root" @keypress="keypressCallback">
      <ContainerComponent
        :id="container.id"
        :container="container"
        :parentContainer="container.parentContainer"
        v-model:selectedContainerId="selectedContainerId"
      ></ContainerComponent>
    </div>
    <StatusBarComponent
      :rootContainer="container"
      :selectedContainerId="selectedContainerId"
    ></StatusBarComponent>
  </div>
</template>

<script lang="ts">
import "reflect-metadata";
import { Vue, Options } from "vue-class-component";
import { Container } from "@/lib/container/container.lib";
import { DEFAULT_CONTAINER, TEST_CONTAINERS } from "@/lib/container/container.mocks";
import ContainerComponent from "@/components/Container.vue";
import StatusBarComponent from "@/components/StatusBar.vue";

@Options({
  components: {
    ContainerComponent,
    StatusBarComponent
  },
})
export default class App extends Vue {

  // ! temp state assignment for testing/dev
  // add from json to json classes for this
  container: Container = DEFAULT_CONTAINER;
  // container: Container = TEST_CONTAINERS[2];
  selectedContainerId: string = this.container.getContainerMemberIds()[0];

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
html,
body {
  margin: 0;
  color: white;
}

.webmux {
  background: black;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
}

.root-container {
  box-sizing: border-box;
  flex-grow: 1;
  color: white;
}
</style>
