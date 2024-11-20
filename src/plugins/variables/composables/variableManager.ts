import type { ConfigurationDTO } from "@/plugins/data/ConfigurationPinia";
import { ref, watch, type Ref, onUnmounted } from "vue";
import type { VueVariableStorageProxy } from "../VueVariableStorageProxy";
import type { Variable } from "../Variable";

export function useVariableManager(
  config: Ref<ConfigurationDTO>,
  variableStorageProxy: VueVariableStorageProxy
) {
  const variable = ref<Variable>(null as unknown as Variable);
  
  const createVariable = () => {
    removeVariable();
    variable.value = variableStorageProxy.createVariable(config.value.name, config.value.config as any);
  };

  const removeVariable = () => {
    if (variable.value) {
      variableStorageProxy.removeVariable(variable.value.name);
    }
  };

  watch(() => config, createVariable, { deep: true });

  onUnmounted(() => {
    removeVariable();
  });

  return {
    variable,
    createVariable,
    removeVariable
  };
}