<script lang="ts" setup>
import ConfigEditor from '@/components/editors/ConfigEditor.vue';
</script>

<template>
  <div class="configuration-editor-container">
    <!-- <h2>Configuration Editor</h2> -->
    <ConfigEditor />
  </div>
</template>

<style lang="scss" scoped>
.configuration-editor-container {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow: hidden;
  height: 100%;
}

.configuration-editor-container h2 {
  margin: 0;
  padding: 16px;
  border-bottom: 1px dashed #e0e0e0;
}
</style>