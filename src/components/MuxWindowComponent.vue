<template>
  <div v-bind:style="this.$props.webMuxWindow.getWindowStyle">
    <div>
      windowId: {{ this.$props.webMuxWindow.windowId }} <br />
      windowIdx: {{ this.$props.webMuxWindow.windowIdx }} <br>
      parentId: {{ this.$props.webMuxWindow.parentContainer.containerId || "NONE" }} <br>
      windowStyle: {{ this.$props.webMuxWindow.getWindowStyle() }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
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
