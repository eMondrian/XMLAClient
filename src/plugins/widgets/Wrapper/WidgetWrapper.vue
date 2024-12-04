<script setup lang="ts">
import { computed, getCurrentInstance } from 'vue';

const { widget } = defineProps<{ widget: IWidget, editEnabled: boolean }>();
const emit = defineEmits(['openSettings', 'removeWidget']);

const instance = getCurrentInstance();
const availableWidgets = instance?.appContext.config.globalProperties.availableWidgets;

const isWidgetRegistered = computed(() => {
  return availableWidgets && availableWidgets[widget.type];
});

const deleteWidget = (id: string): void => {
  emit('removeWidget', id);
}

const openSettings = (id: string): void => {
  emit('openSettings', id);
}

const getShadow = computed(() => {
  let post = ''
  if (widget.wrapperConfig.shadowTransparence) {
    post = widget.wrapperConfig.shadowTransparence.toString(16);
  }
  let color = (widget.wrapperConfig.shadowColor || '#FFFFFF').replace('#', '');
  if (color.length == 3) {
    color = color[0] + color[0] + color[1] + color[1] + color[2] + color[2];
  }

  const ret = `${widget.wrapperConfig.shadowX}px ${widget.wrapperConfig.shadowY}px ${widget.wrapperConfig.shadowBlur}px #${color}${post}`;
  return ret;
});

const getBackground = computed(() => {
  let post = ''
  if (widget.wrapperConfig.backgroundColorTransparence) {
    post = widget.wrapperConfig.backgroundColorTransparence.toString(16);
  }
  let color = (widget.wrapperConfig.backgroundColor || '#FFFFFF').replace('#', '');
  if (color.length == 3) {
    color = color[0] + color[0] + color[1] + color[1] + color[2] + color[2];
  }

  const ret = `#${color}${post}`;
  return ret;
});

const borderColor = computed(() => {
  return widget.wrapperConfig.borderColor || '#000000';
});

const borderSize = computed(() => {
  return widget.wrapperConfig.borderSize || 0;
});

const borderRadius = computed(() => {
  return widget.wrapperConfig.borderRadius || 0;
});

const transparency = computed(() => {
  return widget.wrapperConfig.backgroundColorTransparence ? widget.wrapperConfig.backgroundColorTransparence / 255 : 1;
});
</script>

<template>
  <div class="wrapper-container">
    <div class="wrapper" v-if="isWidgetRegistered">
      <VaScrollContainer color="#133370" vertical horizontal>
        <component :is="widget.type" :config="widget.config" :datasourceId="widget.config.datasourceId"
          class="widget_component" />
      </VaScrollContainer>
      <div class="widget-controls" v-if="editEnabled">
        <VaButton class="control-button" @click="openSettings(widget.uid)" icon="settings" size="small"></VaButton>
        <VaButton class="control-button" @click="deleteWidget(widget.uid)" icon="close" color="danger" size="small">
        </VaButton>
      </div>
    </div>
    <div v-else>
      <p>Widget type {{ widget.type }} is not registered.</p>
    </div>
  </div>
</template>

<style scoped>
.wrapper-container {
  display: flex;
  position: relative;
  flex-direction: column;
  background-color: v-bind(getBackground);
  border-color: v-bind(borderColor);
  border-width: v-bind(borderSize + "px");
  border-style: solid;
  border-radius: v-bind(borderRadius + "px");
  width: 100%;
  height: 100%;
  box-Shadow: v-bind(getShadow);
  opacity: v-bind(transparency);
}

.fullscreen-container {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: #fff;
  z-index: 10000000000;
}

.wrapper {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  cursor: pointer;
  overflow: hidden;
}

.widget-controls {
  position: absolute;
  top: -25px;
  right: 0;
  display: flex;
  justify-content: flex-end;
  background-color: white;
  z-index: 10;
}
</style>