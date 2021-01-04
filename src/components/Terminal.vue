<template>
  <vue-command
    class="terminal"
    v-on:click="selectWindow(item.i)"
    :commands="commands"
  >
    <div style="color: white">{item.i}</div>
  </vue-command>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import VueCommand, { createStdout } from "vue-command";
import "vue-command/dist/vue-command.css";
@Component({
  components: {
    VueCommand
  }
})
export default class Terminal extends Vue {
  commands = {
    "hello-world": () => createStdout("Hello world")
  };
}
</script>

<style scoped>
.terminal {
}
</style>
