import { ref } from 'vue';
import { defineStore } from 'pinia';

export interface ILayoutItem {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  z: number;
}

export const useLayoutStore = defineStore('layout', () => {
  const layout = ref([] as ILayoutItem[]);

  const updateLayout = (updatedLayout: ILayoutItem[]) => {
    layout.value.splice(0, layout.value.length, ...updatedLayout);
  };

  return {
    layout,
    updateLayout,
  };
});