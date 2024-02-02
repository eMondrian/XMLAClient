<script lang="ts" setup>
import { ref, computed } from "vue";

const props = defineProps(["component"]) as any;
const opened = ref({
  textSection: false,
  storeSection: false,
});

const progress = computed({
  get: () => props.component.progress,
  set: (value) => {
    const editedProgress = Math.max(0, Math.min(100, value));
    if (editedProgress >= 0) {
      props.component.progress = editedProgress;
    }
  }
});

</script>

<template>
  <va-collapse v-model="opened.textSection" header="Progress widget settings">
    <div class="settings-container">
      <va-input v-model="progress" label="Progress" />
      <va-color-input v-model="props.component.fillColor" label="Progress fill color" />
      <va-color-input v-model="props.component.backgroundColor" label="Progress background color" />
      <va-checkbox v-model="props.component.isGradient" label="Gradient" />
      <va-checkbox v-model="props.component.isVertical" label="Vertical" />
    </div>
  </va-collapse>
  <va-collapse v-model="opened.storeSection" header="Store settings">
    <div class="settings-container">
      <div>
        <h3 class="mb-2">Select store</h3>
      </div>
    </div>
  </va-collapse>
</template>
<style scoped>
.settings-container {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 1rem;
}

</style>
