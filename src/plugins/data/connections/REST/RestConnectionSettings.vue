<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { debounce } from 'lodash';

const { config } = defineProps<{
  config: any;
}>();
const available = ref(false);
const url = ref(config.url);
const isUrlValid = ref(true);
const statusCode = ref<string | null>(null);

const updateUrl = debounce((newUrl: string) => {
  config.url = newUrl;
  validateAndCheckUrl(newUrl);
}, 700);

watch(url, (newUrl) =>  updateUrl(newUrl));

onMounted(async () => {
  if (url.value) {
    const resp = await ifUrlExist(url.value);
    available.value = resp.available;
    statusCode.value = resp.statusCode;
  }
});

function isValidUrl(url: string): boolean {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";
  } catch {
    return false;
  }
};

async function ifUrlExist(url: string) {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return { available: response.ok, statusCode: response.status.toString() };
  } catch (error: any) {
    console.warn('Network error:', error.name);
    return { available: false, statusCode: 'Error' };
  }
};

async function validateAndCheckUrl(newUrl: string) {
  isUrlValid.value = isValidUrl(newUrl);

  if (isUrlValid.value) {
    const result = await ifUrlExist(newUrl);
    available.value = result.available;
    statusCode.value = result.statusCode;
  } else {
    available.value = false;
    statusCode.value = null;
  }
};
const statusCircleClass = computed(() => (available.value ? 'circle-green' : 'circle-red'));
const statusTextClass = computed(() => {
  return statusCode.value && statusCode.value.toString()[0] === '2' ? 'status-green' : 'status-red';
});
</script>

<template>
  <!-- eslint-disable-next-line vue/no-mutating-props -->
  <VaInput v-model="url" label="URL" :rules="[() => !url || isUrlValid || `Invalid URL`]" />
      
  <div v-if="isUrlValid && url" class="ml-2 request-status">
    <div :class="statusCircleClass" class="status-circle"></div>
    <span class="error-text" :class="statusTextClass">Status: {{ statusCode }}</span>
  </div>
</template>

<style scoped>
.status-circle {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  align-self: center;
}
.circle-green {
  background-color: green;
}
.circle-red {
  background-color: red;
}
.status-green {
  color: green;
}
.status-red {
  color: red;
}
.error-text {
  font-size: 0.9em;
  margin-left: 8px;
}
.request-status {
  display: flex;
}
</style>
