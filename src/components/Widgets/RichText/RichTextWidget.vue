<script lang="ts" setup>
import { ref } from "vue";
import RichTextWidgetSettings from "./RichTextWidgetSettings.vue";
const settings = RichTextWidgetSettings;

const props = defineProps({
  initialState: {
    type: Object,
    required: false,
  },
  editor: {
    type: String,
    required: false,
    default: "",
  },
})

const innerEditor = ref(props.editor || "");

defineExpose({
  editor: innerEditor,
  settings,
})
</script>

<template>
  <div class="text-container">
    <div class="editor-content" v-html="innerEditor"></div>
  </div>
</template>

<style lang="scss">
.text-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  gap: 1rem;
  align-items: stretch;
}

.editor-content {
  width: 100%;
  height: 100%;
  overflow-wrap: anywhere;

  h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  
  h2 {
    font-size: 1.75rem;
    margin-bottom: 1rem;
  }
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
  
  h4 {
    font-size: 1.25rem;
    margin-bottom: 1rem;
  }
  
  h5 {
    font-size: 1.11rem;
    margin-bottom: 1rem;
  }
  
  h6 {
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }
}
</style>
