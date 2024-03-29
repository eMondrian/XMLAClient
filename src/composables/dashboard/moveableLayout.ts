import { ref, getCurrentInstance } from "vue";
import { type ISerializable } from "@/composables/dashboard/serialization";

declare interface LayoutItem {
  x: number;
  y: number;
  width: number;
  height: number;
  z: number;
}

declare interface Layout {
  [key: string]: LayoutItem;
}

declare interface LayoutStorage extends ISerializable {
  getState: () => string;
  loadState: (state: any) => void;
}

export function useMoveableLayout() {
  const instance = getCurrentInstance();
  const layout = ref<Layout>({});

  const layoutStorage: LayoutStorage = {
    getState: () => {
      return JSON.stringify(layout.value);
    },
    loadState: (state) => {
      layout.value = state;
    },
  };

  const getInitialStyle = (id: string) => {
    return {
      width: `${layout.value[id].width}px`,
      height: `${layout.value[id].height}px`,
      transform: `translate(${layout.value[id].x}px, ${layout.value[id].y}px)`,
      "z-index": layout.value[id].z,
    };
  };

  const getMovableControlStyles = (id: string) => {
    return {
      "z-index": layout.value[id].z,
    };
  };

  const drag = (id: string, e) => {
    layout.value[id].x = e.translate[0];
    layout.value[id].y = e.translate[1];

    e.target.style.transform = e.transform;
  };

  const resize = (id: string, e) => {
    e.target.style.width = `${e.width}px`;
    e.target.style.height = `${e.height}px`;

    layout.value[id].width = e.width;
    layout.value[id].height = e.height;
    layout.value[id].x = e.drag.translate[0];
    layout.value[id].y = e.drag.translate[1];

    e.target.style.transform = e.drag.transform;
  };

  const moveUp = (id: string) => {
    const refs = instance?.refs;
    if (!refs) return;

    layout.value[id].z = layout.value[id].z + 1;

    const ref = refs[id] as HTMLElement[];
    ref[0].style["z-index"] = layout.value[id].z;

    const componentRef = refs[`${id}_control`] as { $el: HTMLElement }[];
    componentRef[0].$el.style["z-index"] = layout.value[id].z;
  };

  const moveDown = (id: string) => {
    const refs = instance?.refs;
    if (!refs) return;

    layout.value[id].z = layout.value[id].z - 1;

    const ref = refs[id] as HTMLElement[];
    ref[0].style["z-index"] = layout.value[id].z;

    const componentRef = refs[`${id}_control`] as { $el: HTMLElement }[];
    componentRef[0].$el.style["z-index"] = layout.value[id].z;
  };

  const moveToBottom = (id) => {
    // const obj = Object.entries(layout);
    // const res = obj.reduce(function (p, v) {
    //   return p[1].z < v[1].z ? p : v;
    // }, obj[0]);

    // if (id !== res[0]) {
    //   layout[id].z = res[1].z - 1;

    //   const refArr = ctx.$refs[id];
    //   const ref = Array.isArray(refArr) ? refArr[0] : refArr;

    //   ref.style["z-index"] = layout[id].z;
    //   ctx.$refs[`${id}_control`][0].$el.style["z-index"] = layout[id].z;
    // }
  };

  const moveToTop = (id) => {
    // const obj = Object.entries(layout);
    // const res = obj.reduce(function (p, v) {
    //   return p[1].z > v[1].z ? p : v;
    // }, obj[0]);

    // if (id !== res[0]) {
    //   layout[id].z = res[1].z + 1;

    //   const refArr = ctx.$refs[id];
    //   const ref = Array.isArray(refArr) ? refArr[0] : refArr;

    //   ref.style["z-index"] = layout[id].z;
    //   ctx.$refs[`${id}_control`].$el.style["z-index"] = layout[id].z;
    // }
  };

  return {
    layout,
    layoutStorage,
    getInitialStyle,
    getMovableControlStyles,
    drag,
    resize,
    moveUp,
    moveDown,
    moveToBottom,
    moveToTop,
  };
}
