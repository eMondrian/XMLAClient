<script lang="ts" setup>
import { ref, computed } from "vue";
import ProgressWidgetSettings from "./ProgressWidgetSettings.vue";
const settings = ProgressWidgetSettings;


const props = defineProps({
  initialState: {
    type: Object,
    required: false,
  },
  progress: {
    type: Number,
    required: false,
    default: 0,
  },
  fillColor: {
    type: String,
    required: false,
    default: "#00FF00",
  },
  backgroundColor: {
    type: String,
    required: false,
    default: "#d3d3d3",
  },
  isGradient: {
    type: Boolean,
    required: false,
    default: false,
  },
  isVertical: {
    type: Boolean,
    required: false,
    default: false,
  }
});

const innerProgress = ref(props.progress || 0);
const innerFillColor = ref(props.fillColor || '#00FF00');
const innerBackgroundColor = ref(props.backgroundColor || '#d3d3d3');
const innerIsGradient = ref(props.isGradient || false);
const innerIsVertical = ref(props.isVertical || false);

const gradient = computed(() => {
  return `linear-gradient(40deg, #0000FF, ${innerFillColor.value}, #FF0000)`;
})

defineExpose({
  progress: innerProgress,
  fillColor: innerFillColor,
  isGradient: innerIsGradient,
  isVertical: innerIsVertical,
  backgroundColor: innerBackgroundColor,
  settings,
});
</script>

<template>
  <div class="container">
    <div class="progress">
      <span>{{ `${innerProgress}%` }}</span>
      <div class="progress-percent"></div>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.progress {
  width: v-bind(innerIsVertical ? `35px` : `100%`);
  height: v-bind(!innerIsVertical ? `35px` : `100%`);
  background: v-bind(innerBackgroundColor);
  border-radius: 10px;
  display: flex;
  align-items: end;
  position: relative;
}

.progress-percent {
  height: v-bind(innerIsVertical ? `${innerProgress}%` : `35px`);
  width: v-bind(!innerIsVertical ? `${innerProgress}%` : `35px`);
  background: v-bind(innerIsGradient ? gradient : innerFillColor);
  transition: v-bind(innerIsVertical ? `height .7s ease` : `width .7s ease`);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
}

span {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-weight: 600;
  z-index: 1000;
}
</style>
