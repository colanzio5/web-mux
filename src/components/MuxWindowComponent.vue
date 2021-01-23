<template>
  <div :style="this.$props.webMuxWindow.getWindowStyle(this.$props.windowIdx)">
    windowIdx: {{ this.$props.webMuxWindow.windowIdx }} <br />
    windowId: {{ this.$props.webMuxWindow.windowId }} <br />
    parentId:
    {{ this.$props.webMuxWindow.parentContainer.containerId || "NONE" }}
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { MuxWindow, isMuxWindow } from "@/lib/MuxWindow.lib";
import { MuxContainer, isMuxContainer } from "@/lib/MuxContainer.lib";

@Component({
  props: {
    webMuxWindow: Object,
    windowIdx: Number,
    resizeCallback: Function,
    keydownCallback: Function
  },
  // alias these helper functions onto vue vm
  methods: {
    isMuxContainer: isMuxContainer,
    isMuxWindow: isMuxWindow
  }
})
export default class MuxWindowComponent extends Vue {}
</script>
