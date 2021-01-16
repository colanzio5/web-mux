<template>
  <MuxComponent :keydownCallback="keydownCallback" />
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