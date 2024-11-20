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

  const createLayoutItem = (config: any, id: string) => {

    layout.value.push({
      id,
      ...config,
    });
  };

  const removeLayoutItem = (id: string) => {
    const index = layout.value.findIndex((item) => item.id === id);

    if (index > -1) {
      layout.value.splice(index, 1);
    }
  };

  const updateLayoutItem = (id: string, updatedFields: ILayoutItem) => {
    const index = layout.value.findIndex((item) => item.id === id);

    if (index > -1) {
      layout.value[index] = updatedFields;
    }
  };

  const updateLayout = (updatedLayout: ILayoutItem[]) => {
    layout.value.splice(0, layout.value.length, ...updatedLayout);
  };

  const getLayoutItemById = (id: string): ILayoutItem | undefined => {
    return layout.value.find((item) => item.id === id);
  };

  const getZIndexStats = () => {
    const zIndexes = layout.value.map((item) => item.z);
    const zIndexMax = Math.max(...zIndexes);
    const zIndexMin = Math.min(...zIndexes);
    const countMaxZValues = zIndexes.filter((z) => z === zIndexMax).length;
    const countMinZValues = zIndexes.filter((z) => z === zIndexMin).length;

    return { zIndexMax, zIndexMin, countMaxZValues, countMinZValues };
  };

  const updateZIndexForItem = (id: string, newZ: number) => {
    const item = getLayoutItemById(id);
    if (item) {
      item.z = newZ;
    }
  };

  return {
    layout,
    createLayoutItem,
    removeLayoutItem,
    updateLayoutItem,
    updateLayout,
    getLayoutItemById,
    getZIndexStats,
    updateZIndexForItem,
  };
});
