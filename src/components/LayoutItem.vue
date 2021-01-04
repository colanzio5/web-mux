<template>
  <div class="layout-item" :style="getLayoutItemStyle()">
    {{ this.$props.id }}
    <br />
    {{ this.$props.selectedItemId }}
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { ILayoutMeta, ILayoutItem } from "@/lib/layout.v1.lib";
///vue-responsive-dash
@Component({
  props: {
    // layout specific props
    item: Object,
    // layout metadata
    layoutMeta: Object
  }
})
export default class LayoutItem extends Vue {
  getLayoutItemStyle() {
    const border =
      this.$props.id === this.$props.selectedItemId
        ? "1px solid red"
        : "1px solid purple";
    return {
      border,
      width: this.getItemWidth() + "px",
      height: this.getItemHeight() + "px",
      top: this.getItemTopOffSet() + "px",
      left: this.getItemLeftOffSet() + "px"
    };
  }
  getItemWidth = () => this.$props.layoutWidth / this.$props.numberColumns;
  getItemHeight = () => this.$props.layoutHeight / this.$props.numberRows;
  getItemTopOffSet = () =>
    this.$props.y * this.getItemHeight() + this.$props.layoutTopOffset;
  getItemLeftOffSet = () =>
    this.$props.x * this.getItemWidth() + this.$props.layoutLeftOffset;
}
</script>

<style lang="scss" scoped>
.layout-item {
  position: absolute;
}
</style>
