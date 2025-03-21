import { ref } from "vue";
import { defineStore } from "pinia";
import type { IWidget } from "@/types/Widgets";

export const useWidgetsStore = defineStore("widgets", () => {
    const widgets = ref([] as IWidget[]);

    const createWidget = (type: any, config: any = {}, wrapperConfig: any = {}) => {
        const uid = "li_" + Math.random().toString(36).substring(7);
        const widgetName = "widget_" + uid;

        widgets.value.push({
            uid,
            type,
            wrapperConfig,
            config: {
                datasourceId: config.datasourceId,
                settings: { name: widgetName },
            },
        });
        return uid;
    };

    const removeWidget = (widgetId: string) => {
        const index = widgets.value.findIndex((v) => v.uid === widgetId);

        if (index > -1) {
            widgets.value.splice(index, 1);
        }
    };

    const updateWidget = (widgetId: string, widgetProxy: IWidget) => {
        const widget = widgets.value.find((c) => c.uid === widgetId);

        if (!widget) return;

        widget.uid = widgetProxy.uid;
        widget.type = widgetProxy.type;
        widget.wrapperConfig = widgetProxy.wrapperConfig;
        widget.config = widgetProxy.config;
    };

    const updateWidgets = (widgetsProxy: IWidget[]) => {
        widgets.value.splice(0);
        widgetsProxy.forEach((widgetProxy) => {
            widgets.value.push(widgetProxy);
        });
    };

    return { widgets, createWidget, removeWidget, updateWidget, updateWidgets };
});
