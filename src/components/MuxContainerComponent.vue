<template>
  <div class="container" v-bind:style="this.$props.webMuxContainer.get">
    <!-- display all the container children [either other mux containers or mux windows] -->
    <div v-for="child of this.$props.containerChildren" :key="child.id">
        <MuxContainerComponent v-if="isMuxContainer(child)" :webMuxContainer="child" />
        <MuxWindowComponent v-if="isMuxWindow(child)" :webMuxWindow="child" />
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
    resizeCallback: Function,
    keydownCallback: Function
  },
  // alias these helper functions onto vue vm
  methods: {
    isMuxContainer: isMuxContainer,
    isMuxWindow: isMuxWindow,
  }
})
export default class MuxComponent extends Vue {
  webMux!: WebMux;
  selectedWindow!: MuxWindow;

  mounted() {
    console.log("MuxContainerComponent", this.$props.webMuxContainer)
  }
}
</script>