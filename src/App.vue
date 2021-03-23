<template>
  <div class="root" ref="root">
    <Container :index="index" :id="id" :parent="parent"/>
  </div>
  <button>split</button>
  <button>reset</button>
</template>

<script>
import Container from "./components/Container.vue";
import { v4 as uuid } from "uuid";

export default {
  name: "App",
  components: {
    Container,
  },
  methods: {
    uuid: uuid,
  },
  data() {
    return {
      index: Number(0),
      id: uuid(),
      parent: {
        id: "root"
      },
    };
  }
};
</script>

<style>
.root {
  position: absolute;
  border: 1px solid red;
  height: 50vh;
  width: 50vw;
  left: 50px;
  top: 50px;
}
</style>
