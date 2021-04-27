<template>
  <div class="status-bar">
    <div class="status-bar-item stats-graph" ref="graph"></div>
    <div class="status-bar-spacer"></div>
    <div class="status-bar-item">{{ selectedContainerId }}</div>
  </div>
</template>

<script lang="ts">
import "reflect-metadata";
import { Vue, Options } from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { Container } from "../lib/container/container.lib";

// !this seems broken
import Stats from "stats.js";


@Options({
  name: "StatusBarComponent",
})
export default class StatusBarComponent extends Vue {
  @Prop({ required: true }) selectedContainerId!: string;
  @Prop({ required: true }) rootContainer!: Container;

  stats = new Stats();

  mounted() {
    this.stats.dom.style.position = 'relative';
    this.stats.dom.style.float = 'left';
    this.stats.showPanel(2); // 0: fps, 1: ms, 2: mb, 3+: custom
    const graphRef = this.$refs.graph as HTMLElement;
    graphRef.appendChild(this.stats.dom);
    this.animateStatusBarGraph();
  }

  animateStatusBarGraph(): void {
    this.stats.begin();
    // monitored code goes here

    this.stats.end();
    requestAnimationFrame(this.animateStatusBarGraph);
  }
}
</script>

<style>
.status-bar {
  display: flex;
  flex-direction: row;
  min-height: 2em;
  box-sizing: border-box;
  border: 1px solid red;
  align-items: center;
  justify-content: center;
}

.status-bar-item {
  margin: 0.25em;
}

.status-bar-spacer {
  flex-grow: 1;
}

.stats-graph {
    position: unset !important;
    top: unset !important;
    left: unset !important;
}
</style>
