<template>
  <div class="mux-component">
    <!-- show the root container of the webmux class we inject into the component -->
    <div ref="root" v-if="isRootElementMounted()">
      <div v-for="child of this.webMux.root.containerChildren" :key="child.id">
        <MuxContainerComponent
          v-if="isMuxContainer(child)"
          :webMuxContainer="child"
        />
        <MuxWindowComponent v-if="isMuxWindow(child)" :webMuxWindow="child" />
        <div v-else>Something Went Wrong...</div>
      </div>
    </div>
    <!-- tmux like status bar (window selection, links to visual configuration for component? ) -->
    <div class="status-bar">status-bar</div>
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
  props: {
    resizeCallback: Function,
    keydownCallback: Function
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

  // define these so that we can work
  // with our objects reactively
  // todo: make constructor handel the case where root element does not exist
  data() {
    return { webMux: null, selectedWindow: null };
  }

  mounted() {
    // create the instance of the webmux class
    const rootContainerRef = this.$refs.layout as Element;
    // todo: make a helper function that takes the root element and mounts it, use constructor before root is created
    this.webMux = new WebMux(rootContainerRef);
    // overload the default behavior if props are given
    this.$props.resizeCallback &&
      window.addEventListener("resize", this.$props.resizeCallback);
    this.$props.keydownCallback &&
      window.addEventListener("keydown", this.$props.keydownCallback);
  }

  destroyed() {
    window.removeEventListener("resize", this.$props.resizeCallback);
    window.removeEventListener("keydown", this.$props.keydownCallback);
  }

  // helper function to determine if root element
  // has been created within vue vm
  isRootElementMounted() {
    return this.webMux && this.webMux.root && this.webMux.root.containerChildren;
  }
}
</script>

<style lang="scss" scoped>
.mux-component {
  border: 1 px solid purple;
}

.root {
  border: 1px solid red;
}

.status-bar {
  border: 1px solid red;
}
</style>
