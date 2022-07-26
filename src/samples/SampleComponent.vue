<script lang="ts">
// eslint-disable-next-line node/no-extraneous-import -- Ok
import { defineComponent } from "vue";

export default defineComponent({
  name: "sample-component",
  inheritAttrs: false,
  setup: (_prop, { expose }) => {
    expose({});

    return { x: 1, y: 2 };
  }
});
</script>

<template>
  <div
    :value="{
      inheritAttrs: false,
      name: 'sample-component',
      x,
      y
    }"
  ></div>
</template>
