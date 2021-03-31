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
import { Container } from "./lib/container/container.lib";
import { TEST_CONTAINERS } from "./lib/container/container.mocks";

@Options({
  components: {
    ContainerComponent,
  },
})
export default class App extends Vue {
  container: Container = TEST_CONTAINERS[2];
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
