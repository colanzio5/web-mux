<template>
  <div class="container" v-bind:style="this.$props.webMuxWindow.getWindowStyle">
    <p>I am a mux window</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { WebMux } from "@/lib/WebMux.lib";
import { MuxWindow, isMuxWindow } from "@/lib/MuxWindow.lib";
import { MuxContainer, isMuxContainer } from "@/lib/MuxContainer.lib";

@Component({
  props: {
    webMuxWindow: Object,
    resizeCallback: Function,
    keydownCallback: Function
  },
  // alias these helper functions onto vue vm
  methods: {
    isMuxContainer: isMuxContainer,
    isMuxWindow: isMuxWindow
  }
})
export default class MuxWindowComponent extends Vue {
  mounted() {
    console.log("MuxWindowComponent", this.$props.webMuxWindow);
  }
}
</script>

<style lang="scss" scoped></style>
