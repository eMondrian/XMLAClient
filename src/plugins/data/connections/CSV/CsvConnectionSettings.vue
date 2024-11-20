<script setup lang="ts">
const { config } = defineProps<{
  config: any;
}>();
</script>

<template>

  <!-- eslint-disable-next-line vue/no-mutating-props -->
  <VaInput v-model="config.url" label="URL" />
</template>