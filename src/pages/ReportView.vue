<script setup lang="ts">
import { ref } from "vue";
import { useWidgetsStore } from "@/plugins/data/WidgetsPinia";
import { useMoveableLayout } from "@/composables/movableLayout";
import { useLayoutStore } from "@/plugins/data/LayoutsPinia";
import WidgetWrapper from "@/plugins/widgets/Wrapper/WidgetWrapper.vue";

const { widgets } = useWidgetsStore();
const { layout } = useLayoutStore();
const {
  getInitialStyle,
} = useMoveableLayout(ref(layout));

</script>

<template>
  <div style="padding: 16px;">
    Report View
    <div class="widget-board">
      <template v-for="widget in widgets" :key="widget.uid">
        <div
          :class="`${widget.uid} dashboard-item-container`"
          :style="getInitialStyle(widget.uid)"
          :ref="widget.uid"
        >
          <div class="dashboard-item">
            <WidgetWrapper
              :widget="widget"
              :ref="`${widget.uid}_wrapper`"
              :editEnabled="false"
            />
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.widget-board {
  width: 100%;
  height: 100%;
  display: flex;
  padding: 35px 35px 0 35px;
  box-sizing: border-box;
  overflow-y: auto;
  overflow-x: hidden;
}

.dashboard-item {
  position: absolute;
  width: 100%;
  height: 100%;
}

.dashboard-item-container {
  position: absolute;
}
</style>
