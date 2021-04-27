<template>
  <div>
    CANVAS
  </div>
</template>

<script lang="ts">
import "reflect-metadata";
import { Vue, Options } from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { Container } from "@/lib/container/container.lib";

@Options({
  name: "CanvasWindowComponent",
})
export default class CanvasWindowComponent extends Vue {
  @Prop({ required: true }) container!: Container;
}
</script>
