<template>
  <div class="simple-web-mux"><SimpleWebMux /></div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SimpleWebMux from "@/views/SimpleWebMux.vue";

@Component({
  components: {
    SimpleWebMux
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
  display: table;
  height: 100vh;
  width: 100vw;
}

.simple-web-mux {
  height: 75vh;
  width: 75vw;
  display: table-cell;
  text-align: center;
  vertical-align: middle;
}
</style>
