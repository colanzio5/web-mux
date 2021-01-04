<template>
  <vue-command :commands="commands"></vue-command>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import VueCommand, { createStdout } from "vue-command";
import "vue-command/dist/vue-command.css";

// ! placeholder vue component for the contents of each MuxWindow
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