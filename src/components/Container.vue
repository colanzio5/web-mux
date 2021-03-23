<template>
  <!-- if the container has no children, we render the window (recursive break) -->
  <div
    v-if="this.children && !isContainerParent()"
    :style="getWindowStyle()"
    class="window"
  ></div>
  <!-- if container has children, render the children -->
  <Container
    v-else
    :style="getContainerStyle(idx)"
    v-for="(child, idx) in this.children"
    :key="child.id"
    :id="child.id"
    :index="idx"
    :parent="this"
  />
</template>

<script lang="ts">
import "reflect-metadata";
import { v4 as uuid } from "uuid";
import { Vue, Options} from "vue-class-component";
import { Component, Prop } from "vue-property-decorator";

type Container = {
  id: String;
  children: Container[];
  size: {
    height?: number;
    width?: number;
    left?: number;
    top?: number;
  };
};

@Options({
  name: "Container",
})
export default class ContainerComponent extends Vue {
  @Prop() index: Number;
  @Prop() id: String;
  @Prop() container: Container;
  @Prop() parentContainer: Container;

  mounted() {
    this.setContainerSize();
    addEventListener("resize", this.setContainerSize);
  }

  setContainerSize() {
    if (this.parentContainer.id === "root") {
      this.container.size = this.sizeFromElement(this.$parent.$refs.root);
      this.container.children = [{ id: uuid(), size: {}, children: [] }, { id: uuid(), size: {}, children: [] }];
      console.log("set root container from root ref...", this.container.size);
    } else {
      this.calculateContainerSize();
      console.log("set child container using parent ref...", this.container.size);
    }
  }

  calculateContainerSize() {
    console.log(
      "calculating container size...",
      this.parentContainer,
      this.index
    );``
  }
  getContainerStyle(index) {
    const parentSize = this.sizeFromElement(this.$refs.parent.id);
    console.log("getContainerSize", index, parentSize);
  }

  getWindowStyle() {
    return {
      height: this.container.size.height + "px",
      width: this.container.size.width + "px",
      top: this.container.size.top + "px",
      left: this.container.size.left + "px",
    };
  }

  splitContainer(direction) {
    console.log("splitContainer", direction);
    switch (direction) {
      case "VERTICAL":
        break;
      case "HORIZONTAL":
        break;
      case "UNDEFINED":
        break;
      default:
        console.error("splitContainer direction not instantiated...");
    }
  }

  isContainerParent() {
    const isContainerParent = this.container.children.length > 0;
    console.log("isContainerParent", { ...this.container.children }, isContainerParent);
    return isContainerParent;
  }
  
  sizeFromElement(htmlElement) {
    return {
      height: htmlElement?.clientHeight || 0,
      width: htmlElement?.clientWidth || 0,
      left: htmlElement?.clientLeft || 0,
      top: htmlElement?.clientTop || 0,
    };
  }
}
</script>

<style scoped>
.container {
  border: 1px solid green;
}

.window {
  border: 1px solid blue;
}
</style>
