<template>
  <MuxComponent
    :webMux="webMux"
    :resizeCallback="resizeCallback"
    :keydownCallback="keydownCallback"
  />
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
export default class SimpleWebMux extends Vue {
  webMux!: WebMux;

  created() {
    const rootContainerRef = this.$refs.layout as Element;
    this.webMux = new WebMux(rootContainerRef);
  }

  // todo: this should be hidden in the simple example
  // ! potentially should be removed from public api
  resizeCallback(event: any) {
    const rootContainerRef = this.$refs.layout as Element;
    this.webMux.root.resizeContainer(rootContainerRef);
  }

  // todo: this should be hidden in the simple example
  // ! potentially should be removed from public api
  keydownCallback(event: any) {
    // key codes (https://keycode.info/)
    // prevent default - https://github.com/iFgR/vue-shortkey/issues/71
    if (event.ctrlKey || event.metaKey) {
      switch (event.which || event.keyCode) {
        case 69: // ctrl+e
          event.preventDefault();
          throw new Error("Method not implemented.");
          break;
        case 87: // crtl+w
          event.preventDefault();
          throw new Error("Method not implemented.");
          break;
        case 38: // ctrl+up
          this.webMux.scrollSelectedWindow("UP");
          break;
        case 40: // ctrl+down
          this.webMux.scrollSelectedWindow("DOWN");
          break;
        case 37: // ctrl+left
          this.webMux.scrollSelectedWindow("LEFT");
          break;
        case 39: // ctrl+right
          this.webMux.scrollSelectedWindow("RIGHT");
          break;
        default:
          break;
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
