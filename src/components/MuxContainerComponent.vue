<template>
  <div class="container">
    <!-- display all the container children [either other mux containers or mux windows] -->
    <div v-for="child of this.$props.children" :key="child.id">
      <MuxContainerComponent v-if="isMuxContainer(child)"/>  
      <MuxWindowComponent v-if="isMuxWindow(child)"/>
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
    webMuxContainer: MuxContainer,
    resizeCallback: Function,
    keydownCallback: Function
  }
})
export default class MuxComponent extends Vue {
  webMux!: WebMux;
  selectedWindow!: MuxWindow;
}
</script>

<style lang="scss" scoped></style>
