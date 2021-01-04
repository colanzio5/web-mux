<template>
  <!-- todo: title bar / show title text of window selected -->
  <!-- show the root container of the webmux class we inject into the component -->
  <div></div>
  <!-- todo: tmux like status bar (window selection, links to visual configuration for component? ) -->
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import MuxWindowComponent from "@/components/MuxWindowComponent.vue";
import MuxContainerComponent from "@/components/MuxContainerComponent.vue";
import {WebMux} from "@/lib/WebMux.lib";
import {MuxWindow} from "@/lib/MuxWindow.lib"

@Component({
  components: {
    MuxWindowComponent,
    MuxContainerComponent
  },
  props: {
    webMux: WebMux,
    resizeCallback: Function,
    keydownCallback: Function
  }
})
export default class MuxComponent extends Vue {
  webMux!: WebMux;
  selectedWindow!: MuxWindow;

  created() {
    const rootContainerRef = this.$refs.layout as Element;
    this.webMux = this.$props.webMux;
    window.addEventListener("resize", this.$props.resizeCallback);
    window.addEventListener("keydown", this.$props.keydownCallback);
  }

  destroyed() {
    window.removeEventListener("resize", this.$props.resizeCallback);
    window.removeEventListener("keydown", this.$props.keydownCallback);
  }
}
</script>

<style lang="scss" scoped></style>
