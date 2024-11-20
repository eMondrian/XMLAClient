import { Variable } from './Variable';
import { VariableStorage } from './VariableStorage';

export class ComputedVariable extends Variable {
    private innerExpression: string = '';
    public type = 'computed';

    constructor(name: string, storage: VariableStorage, config: IComputedVariableConfig) {
      super(name, storage, config);
      this.expression = config.expression;
    }

    get expression(): string {
      return this.innerExpression;
    }

    set expression(expression) {
      this.innerExpression = expression;
    }

    // TODO: Think if the inner value is necessary
    get value(): any {
      return this.computeValue();
    }

    getDependencies(): string[] {
      const regexp = /\$(\S+)*/gm;
      const dependencies = [] as string[];
      let m: RegExpExecArray | null;

      while ((m = regexp.exec(this.innerExpression)) !== null) {
        if (m.index === regexp.lastIndex) {
          regexp.lastIndex++;
        }
        dependencies.push(m[1]);
      }

      return dependencies;
    }

    computeValue() {
      const dependencies = this.getDependencies();
      let result = this.innerExpression;

      dependencies.forEach(dep => {
        result = result.replace(`$${dep}`, typeof this.storage.getVariable(dep)?.value === 'number' ? this.storage.getVariable(dep)?.value : `'${this.storage.getVariable(dep)?.value}'`);
      });

      const execFn = new Function(`return ${result}`);
      return execFn();
    }
}