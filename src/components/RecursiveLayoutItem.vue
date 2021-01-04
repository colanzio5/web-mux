<template>
  <div
    v-if="children.length == 0"
    class="layout-item"
    :style="getLayoutItemStyle()"
  >
    {{ id }}
  </div>
  <div v-else>
    <RecursiveLayoutItem
      v-for="child in children"
      :key="child.id"
      :id="child.id"
      :x="child.x"
      :y="child.y"
      :w="child.w"
      :h="child.h"
      :children="child.children"
      :layoutItemMeta="child.layoutItemMeta"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  props: {
    // layout specific props
    // root: Object,
    id: String,
    h: Number,
    w: Number,
    x: Number,
    y: Number,
    children: Array,
    // layout metadata
    layoutItemMeta: Object
  }
})
export default class RecursiveLayoutItem extends Vue {
  getLayoutItemStyle() {
    const style = {
      border: "1px solid purple",
      width: this.getItemWidth() + "px",
      height: this.getItemHeight() + "px",
      top: this.getItemTopOffSet() + "px",
      left: this.getItemLeftOffSet() + "px"
    };
    return style;
  }
  getItemWidth = () => this.$props.w;
  getItemHeight = () => this.$props.h;
  getItemTopOffSet = () => this.$props.y + this.$props.layoutTopOffset;
  getItemLeftOffSet = () => this.$props.x + this.$props.layoutLeftOffset;
}
</script>

<style lang="css">
.layout-item {
  position:absolute;
}
</style>
