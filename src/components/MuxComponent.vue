<template>
  <div ref="container" class="root">
    <div v-if="isRootElementMounted()">
      <div
        v-for="(child, index) in this.webMux.root.containerChildren"
        :key="child.id"
      >
        <MuxContainerComponent
          v-if="isMuxContainer(child)"
          :webMuxContainer="child"
          :containerIdx="index"
        />
        <MuxWindowComponent
          v-if="isMuxWindow(child)"
          :webMuxWindow="child"
          :windowIdx="index"
        />
        <div v-else>Something Went Wrong...</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import MuxWindowComponent from "@/components/MuxWindowComponent.vue";
import MuxContainerComponent from "@/components/MuxContainerComponent.vue";
import { WebMux } from "@/lib/WebMux.lib";
import { MuxWindow, isMuxWindow } from "@/lib/MuxWindow.lib";
import { isMuxContainer } from "@/lib/MuxContainer.lib";

@Component({
  components: {
    MuxWindowComponent,
    MuxContainerComponent
  },
  // alias these lib helper functions onto vue vm
  methods: {
    isMuxContainer: isMuxContainer,
    isMuxWindow: isMuxWindow
  }
})
export default class MuxComponent extends Vue {
  webMux!: WebMux;
  selectedWindow!: MuxWindow;

  // define these so that we can work with our objects reactively
  // updates will not propogate if this is not defined
  data() {
    return { webMux: null, selectedWindow: null };
  }

  mounted() {
    // create the instance of the webmux class
    const rootContainerRef = this.$refs.container as Element;
    // todo: make a helper function that takes the root element and mounts it, use constructor before root is created
    this.webMux = new WebMux(rootContainerRef);
    // todo: overload the default behavior only if props are given
    window.addEventListener("resize", this.resizeCallback);
    window.addEventListener("keydown", this.keydownCallback);
  }

  destroyed() {
    // remove the given props/listeners if props are given
    window.removeEventListener("resize", this.resizeCallback);
    window.removeEventListener("keydown", this.keydownCallback);
  }

  // helper function to determine if root element
  // has been created within vue vm
  isRootElementMounted() {
    return (
      this.webMux && this.webMux.root && this.webMux.root.containerChildren
    );
  }

  resizeCallback() {
    this.webMux.root.resizeContainer(this.$refs.container as Element);
  }

  // todo: overload starting height and width
  // todo: add additional callback to resize events
  // example of overwriting the components
  // keyboard behavior
  // ! this should be a key value object
  keydownCallback(event: KeyboardEvent) {
    // key codes (https://keycode.info/)
    // prevent default - https://github.com/iFgR/vue-shortkey/issues/71
    if (event.ctrlKey || event.metaKey) {
      switch (event.which || event.keyCode) {
        default:
          break;
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.root {
  border: 1px solid red;
  height: stretch;
  width: stretch;
}

</style>
