<template>
  <div>
    {{ container.id }}
  </div>
</template>

<script lang="ts">
import "reflect-metadata";
import { Vue, Options } from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { Container } from "@/lib/container/container.lib";

@Options({
  name: "DefaultWindowComponent",
})
export default class DefaultWindowComponent extends Vue {
  @Prop({ required: true }) container!: Container;
}
</script>
