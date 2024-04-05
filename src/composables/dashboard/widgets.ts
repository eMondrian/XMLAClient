import { ref, getCurrentInstance } from "vue";
import type { ISerializable } from "./serialization";
import { enabledWidgets, widgetNames } from "@/components/Widgets";

declare interface Widget {
  id: string;
  component: string;
  caption: string;
  state?: any;
}

export function useWidgets() {
  const instance = getCurrentInstance();
  const widgets = ref<Widget[]>([]);

  const widgetsStorage: ISerializable = {
    getState: () => {
      const state = {};

      widgets.value.forEach((widget) => {
        const refs = instance?.refs;
        if (!refs) return;

        const componentRef = refs[`${widget.id}_component`] as ISerializable[];
        state[widget.id] = componentRef[0].getState();

        const wrapperRef = refs[`${widget.id}_wrapper`] as ISerializable[];
        state[`${widget.id}_wrapper`] = wrapperRef[0].getState();
      });

      return JSON.stringify(state);
    },
    loadState: (state) => {
      console.warn("Not implemented");
    },
  };

  const addWidget = (component: string, id: string) => {
    widgets.value.push({
      id,
      component,
      caption: "Test",
    });
  };

  const removeWidget = (id: string) => {
    widgets.value = widgets.value.filter((widget) => widget.id !== id);
  };

  return {
    widgets,
    widgetsStorage,
    addWidget,
    enabledWidgets,
    widgetNames,
    removeWidget,
  };
}
