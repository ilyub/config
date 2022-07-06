<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "sample-component",
  inheritAttrs: false
});
</script>

<template>
  <div :value="{ inheritAttrs: false, name: 'sample-component' }"></div>
</template>
