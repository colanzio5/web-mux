<template>
  <div class="layout" ref="layout">
    <RecursiveLayoutItem
      :id="layout.id"
      :x="layout.x"
      :y="layout.y"
      :w="layout.w"
      :h="layout.h"
      :children="layout.children"
      :layoutItemMeta="layout.layoutItemMeta"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Layout from "@/lib/layout.v2.lib";
import RecursiveLayoutItem from "@/components/RecursiveLayoutItem.vue";

@Component({
  components: {
    RecursiveLayoutItem
  }
})
export default class RecursiveLayout extends Vue {
  layout = new Layout();

  mounted() {
    this.resizeCallback(new Event("resize"));
    window.addEventListener("resize", this.resizeCallback);
    window.addEventListener("keydown", this.keydownCallback);
  }

  destroyed() {
    window.removeEventListener("resize", this.resizeCallback);
    window.removeEventListener("keydown", this.keydownCallback);
  }

  resizeCallback(event: any) {
    const layoutRef = this.$refs.layout as Element;
    this.layout.layoutItemMeta.layoutLeftOffset = layoutRef.getBoundingClientRect().left;
    this.layout.layoutItemMeta.layoutTopOffset = layoutRef.getBoundingClientRect().top;
    this.layout.layoutItemMeta.layoutWidth = layoutRef.clientWidth;
    this.layout.layoutItemMeta.layoutHeight = layoutRef.clientHeight;
  }

  keydownCallback(event: any) {
    // key codes (https://keycode.info/)
    // prevent default - https://github.com/iFgR/vue-shortkey/issues/71
    if (event.ctrlKey || event.metaKey) {
      switch (event.which || event.keyCode) {
        case 69: // ctrl+e
          event.preventDefault();
          this.layout.splitVertical();
          break;
        case 87: // crtl+w
          event.preventDefault();
          this.layout.deleteItem();
          break;
        case 38: // ctrl+up
          this.layout.scrollSelectedWindow("UP");
          break;
        case 40: // ctrl+down
          this.layout.scrollSelectedWindow("DOWN");
          break;
        case 37: // ctrl+left
          this.layout.scrollSelectedWindow("LEFT");
          break;
        case 39: // ctrl+right
          this.layout.scrollSelectedWindow("RIGHT");
          break;
        default:
          break;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.layout {
  width: 100vw;
  height: 98vh;
  max-width: 100%; /* added */
}
</style>
