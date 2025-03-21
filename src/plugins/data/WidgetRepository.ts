import type { WidgetConfig } from "@/types/Widgets";

export class WidgetRepository {
    private availableWidgets: Record<string, WidgetConfig> = {};

    registerWidget(name: string, config: WidgetConfig) {
        this.availableWidgets[name] = config;
    }

    getWidget(name: string): WidgetConfig {
        return this.availableWidgets[name];
    }

    getAllWidgets(): Record<string, WidgetConfig> {
        return this.availableWidgets;
    }
}
