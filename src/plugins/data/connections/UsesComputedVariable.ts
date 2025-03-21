import { ComputedString } from '@/plugins/variables/ComputedString';
import { VariableStorage } from '@/plugins/variables/VariableStorage';

export interface UsesComputedVariableConfig {
  variableStorage: VariableStorage;  
}

export default class UsesComputedVariable {
    protected variableStorage: VariableStorage;
    protected updateCb: () => void = () => {};

    constructor(config: UsesComputedVariableConfig) {
        this.variableStorage = config.variableStorage;
    }

    protected setUpdateCb(cb: () => void) {
        this.updateCb = cb;
}

    initVariable(expression: string): ComputedString {
        const variable = new ComputedString(this.variableStorage, expression, () => {
            this.updateCb();
        });
        return variable
    }
}