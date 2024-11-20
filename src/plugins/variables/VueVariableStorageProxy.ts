import { reactive } from "vue";
import type { VariableStorage } from "./VariableStorage";

export class VueVariableStorageProxy {
  private storage: VariableStorage;

  constructor(storage: VariableStorage) {
    this.storage = storage;
  }

  createVariable(name: string, config: INewVariableConfig) {
    const variable = this.storage.createVariable(name, config);
    const reactiveVariable = reactive(variable);

    const updateFn = () => {
      // Forces vue to update the value
      reactiveVariable.value = variable.value;
    };

    variable.subscribe(updateFn);
    console.log(reactiveVariable)
    return reactiveVariable;
  }

  removeVariable(name: string) {
    this.storage.removeVariable(name);
  }

  getVariable(name: string) {
    return reactive(this.storage.getVariable(name));
  }

  clearStorage() {
    this.storage.clearStorage();
  }
}