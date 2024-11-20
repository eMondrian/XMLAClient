import { useLayoutStore } from '@/plugins/data/LayoutsPinia';

export function useMoveableLayout() {
  const {
    getLayoutItemById,
    updateZIndexForItem,
    getZIndexStats,
  } = useLayoutStore();

  const getInitialStyle = (id: string) => {
    const item = getLayoutItemById(id);
    if (!item) return {};

    return {
      width: `${item.width}px`,
      height: `${item.height}px`,
      transform: `translate(${item.x}px, ${item.y}px)`,
      'z-index': item.z,
    };
  };

  const getMovableControlStyles = (id: string) => {
    const item = getLayoutItemById(id);
    if (!item) return {};

    return {
      'z-index': item.z,
    };
  };

  const drag = (id: string, e) => {
    const item = getLayoutItemById(id);
    if (!item) return;

    item.x = e.translate[0];
    item.y = e.translate[1];

    e.target.style.transform = e.transform;
  };

  const resize = (id: string, e) => {
    const item = getLayoutItemById(id);
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
    const { zIndexMax, countMaxZValues } = getZIndexStats();
    const item = getLayoutItemById(id);
    if (!item) return;

    if (item.z === zIndexMax && countMaxZValues === 1) return;

    updateZIndexForItem(id, item.z + 1);
  };

  const moveToTop = (id: string) => {
    const { zIndexMax } = getZIndexStats();
    const item = getLayoutItemById(id);
    if (!item) return;

    updateZIndexForItem(id, zIndexMax + 1);
  };

  const moveDown = (id: string) => {
    const { zIndexMin, countMinZValues } = getZIndexStats();
    const item = getLayoutItemById(id);
    if (!item) return;

    if (item.z === zIndexMin && countMinZValues === 1) return;

    updateZIndexForItem(id, item.z - 1);
  };

  const moveToBottom = (id: string) => {
    const { zIndexMin } = getZIndexStats();
    const item = getLayoutItemById(id);
    if (!item) return;

    updateZIndexForItem(id, zIndexMin - 1);
  };

  return {
    getInitialStyle,
    getMovableControlStyles,
    drag,
    resize,
    moveUp,
    moveDown,
    moveToTop,
    moveToBottom,
  };
}
