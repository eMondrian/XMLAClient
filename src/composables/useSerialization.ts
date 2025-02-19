import { useConfigurationsStore } from "@/plugins/data/ConfigurationPinia";
import { useConnectionsStore } from "@/plugins/data/ConnectionsPinia";
import { useDataSourcesStore } from "@/plugins/data/DatasourcePinia";
import { useLayoutStore } from "@/plugins/data/LayoutsPinia";
import { useWidgetsStore } from "@/plugins/data/WidgetsPinia";

export function useSerialization(states: any) {
  const configurationStore = useConfigurationsStore();
  const datasourcesStore = useDataSourcesStore();
  const connectionsStore = useConnectionsStore();
  const widgetsStore = useWidgetsStore();
  const layoutStore = useLayoutStore();
  const state = {} as any;

  const updateMethods = {
    configurations: configurationStore.updateConfigurations,
    connections: connectionsStore.updateConnections,
    datasources: datasourcesStore.updateDataSources,
    widgets: widgetsStore.updateWidgets,
    layout: layoutStore.updateLayout,
  };

  const getState = () => {
    for (const key in states) {
      state[key] = states[key];
    }
    return JSON.stringify(state);
  };

  const loadState = (state: any) => {
    const parsedState = JSON.parse(state);

    // Order of calls here matters
    updateMethods.configurations(parsedState.configurations);
    updateMethods.connections(parsedState.connections);
    updateMethods.datasources(parsedState.datasources);
    updateMethods.widgets(parsedState.widgets);
    updateMethods.layout(parsedState.layout);


      // Object.entries(parsedState)
      //   .filter(([, value]) => value !== null && value !== undefined)
      //   .forEach(([key, value]) => {
      //     updateMethods[key]?.(value);
      //   });
  };

  return {
    getState,
    loadState
  };
}