<template>
  <div class="simple-web-mux"><MuxComponent /></div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { WebMux } from "@/lib/WebMux.lib";
import MuxComponent from "@/components/MuxComponent.vue";
@Component({
  components: {
    MuxComponent
  }
})
export default class App extends Vue {}
</script>

<style lang="scss">
@font-face {
  font-family: "GnuUnifont";
  src: local("GnuUnifont"),
    url("./assets/GnuUnifontFull-Pm9P.ttf") format("truetype");
}

html,
body {
  margin: 0;
  padding: 0;
  background: black;
  color: white;
  font-family: "GnuUnifont";
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

.simple-web-mux {
  margin-left: 5vw;
  margin-right: 5vw;
  margin-top: 5vh;
  margin-bottom: 5vh;
  height: 70vh;
  width: 70vw;
}
</style>
