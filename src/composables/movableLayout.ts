import { type ILayoutItem } from '@/plugins/data/LayoutsPinia';
import { type Ref } from 'vue';

export function useMoveableLayout(localLayoutItems: Ref<ILayoutItem[]>) {

  const getInitialStyle = (id: string) => {
    const item = localLayoutItems.value.find((item: ILayoutItem) => item.id === id);
    if (!item) return {};

    return {
      width: `${item.width}px`,
      height: `${item.height}px`,
      transform: `translate(${item.x}px, ${item.y}px)`,
      'z-index': item.z,
    };
  };

  const getMovableControlStyles = (id: string) => {
    const item = localLayoutItems.value.find((item: ILayoutItem) => item.id === id);
    if (!item) return {};

    return {
      'z-index': item.z,
    };
  };

  const drag = (id: string, e) => {
    const item = localLayoutItems.value.find((item: ILayoutItem) => item.id === id);
    if (!item) return;

    item.x = e.translate[0];
    item.y = e.translate[1];

    e.target.style.transform = e.transform;
  };

  const resize = (id: string, e) => {
    const item = localLayoutItems.value.find((item: ILayoutItem) => item.id === id);
    if (!item) return;

    item.width = e.width;
    item.height = e.height;
    item.x = e.drag.translate[0];
    item.y = e.drag.translate[1];

    e.target.style.width = `${e.width}px`;
    e.target.style.height = `${e.height}px`;
    e.target.style.transform = e.drag.transform;
  };

  const moveUp = (id: string) => {
    const item = localLayoutItems.value.find((item: ILayoutItem) => item.id === id);
    if (!item) return;

    item.z += 1;
  };

  const moveToTop = (id: string) => {
    const zIndexMax = Math.max(...localLayoutItems.value.map((item: ILayoutItem) => item.z));
    const item = localLayoutItems.value.find((item: ILayoutItem) => item.id === id);
    if (!item) return;

    item.z = zIndexMax + 1;
  };

  const moveDown = (id: string) => {
    const item = localLayoutItems.value.find((item: ILayoutItem) => item.id === id);
    if (!item) return;

    item.z -= 1;
  };

  const moveToBottom = (id: string) => {
    const zIndexMin = Math.min(...localLayoutItems.value.map((item: ILayoutItem) => item.z));
    const item = localLayoutItems.value.find((item: ILayoutItem) => item.id === id);
    if (!item) return;

    item.z = zIndexMin - 1;
  };

  return {
    getInitialStyle,
    getMovableControlStyles,
    drag,
    resize,
    moveUp,
    moveDown,
    moveToTop,
    moveToBottom
  };
}