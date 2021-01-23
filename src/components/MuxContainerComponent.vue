<template>
  <div class="container" ref="container" :style="getContainerStyle()">
    <!-- display all the container children [either other mux containers or mux windows] -->
    <div
      v-for="(child, index) in this.$props.webMuxContainer.containerChildren"
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
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import MuxWindowComponent from "@/components/MuxWindowComponent.vue";
import MuxContainerComponent from "@/components/MuxContainerComponent.vue";
import { WebMux } from "@/lib/WebMux.lib";
import { MuxWindow, isMuxWindow } from "@/lib/MuxWindow.lib";
import { MuxContainer, isMuxContainer } from "@/lib/MuxContainer.lib";

@Component({
  components: {
    MuxWindowComponent,
    MuxContainerComponent
  },
  props: {
    webMuxContainer: Object,
    containerIdx: Number,
  },
  // alias these helper functions onto vue vm
  methods: {
    isMuxContainer: isMuxContainer,
    isMuxWindow: isMuxWindow
  }
})
export default class MuxComponent extends Vue {
  webMux!: WebMux;
  selectedWindow!: MuxWindow;

  mounted() {
    window.addEventListener("resize", this.$props.resizeCallback);
    window.addEventListener("keydown", this.$props.keydownCallback);
  }
  destroyed() {
    // remove the given props/listeners if props are given
    window.removeEventListener("resize", this.$props.resizeCallback);
    window.removeEventListener("keydown", this.$props.keydownCallback);
  }

  resizeCallback() {
    this.webMux.root.resizeContainer(this.$refs.container as Element);
  }

  getContainerStyle() {
    const style = this.$props.webMuxContainer.getContainerStyle(
      this.$props.containerIdx
    );
    return style;
  }
}
</script>
