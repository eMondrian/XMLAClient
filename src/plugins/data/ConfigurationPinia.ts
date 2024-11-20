import { ref, getCurrentInstance } from 'vue'
import { defineStore } from 'pinia'
import { VueVariableStorageProxy } from "@/plugins/variables/VueVariableStorageProxy";

export interface ConfigurationDTO {
  name: string;
  config: {
    [key: string]: any;
  }
}

export const useConfigurationsStore = defineStore('configurations', () => {
  const configurations = ref([] as ConfigurationDTO[]);
  const instance = getCurrentInstance();


  const updateConfigurations = (configurationsDTO: ConfigurationDTO[]) => {
    const variableStorage = instance?.appContext.config.globalProperties.$variableStorage as VueVariableStorageProxy;

    // Add validation here
    configurations.value.splice(0);
    
    variableStorage.clearStorage();
    configurationsDTO.forEach((config) => {
      configurations.value.push(config);
      variableStorage.createVariable(config.name, config.config as IVariableConfig);
    });

    console.log(variableStorage);
  }

  return {
    configurations,
    updateConfigurations,
  }
})
