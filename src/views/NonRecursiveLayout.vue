<template>
  <div class="layout" ref="layout">
    <LayoutItem
      v-for="item in layout.layoutItems"
      :key="item.id"
      v-bind="item"
      :layoutMeta="layout.layoutMeta"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Layout } from "@/lib/layout.v1.lib";
import LayoutItem from "@/components/LayoutItem.vue";

@Component({
  components: {
    LayoutItem
  }
})
export default class NonRecursiveLayout extends Vue {
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
    this.layout.layoutMeta.layoutLeftOffset = layoutRef.getBoundingClientRect().left;
    this.layout.layoutMeta.layoutTopOffset = layoutRef.getBoundingClientRect().top;
    this.layout.layoutMeta.layoutWidth = layoutRef.clientWidth;
    this.layout.layoutMeta.layoutHeight = layoutRef.clientHeight;
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
  border: 1px solid red;
}
</style>
