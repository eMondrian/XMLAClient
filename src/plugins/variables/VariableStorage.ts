import { ConstantVariable } from "@/plugins/variables/ConstantVariable";
import { ComputedVariable } from "@/plugins/variables/ComputedVariable";
import { QueryVariable } from "@/plugins/variables/QueryVariable";
import { RequestVariable } from "@/plugins/variables/RequestVariable";
import { TimeVariable } from "./TimeVariable";
import { SourceType }  from '@/types/enum';
import type { TinyEmitter } from "tiny-emitter";

export class VariableStorage {
  private variables: { [key: string]: any } = {};

  constructor(public eventBus: TinyEmitter) {}

  createVariable(name: string, config: INewVariableConfig) {

    switch (config.type) {
      case SourceType.Constant:
        this.variables[name] = new ConstantVariable(name, this, config as IConstantVariableConfig);
        break;
      case SourceType.Expression:
        this.variables[name] = new ComputedVariable(name, this, config as IComputedVariableConfig);
        break;
      case SourceType.QueryParameter:
        this.variables[name] = new QueryVariable(name, this, config as IQueryVariableConfig);
        break;
      case SourceType.AsyncParameters:
        this.variables[name] = new RequestVariable(name, this, config as IRequestVaribleConfig);
        break;
      case SourceType.Time:
        this.variables[name] = new TimeVariable(name, this, config as IConstantVariableConfig);
        break;
      default:
        throw new Error('variable type not implemented yet');
    }

    return this.variables[name];
  }

  removeVariable(name: string) {
    if (this.variables[name]) {
      this.variables[name].clearInterval();
      this.variables[name].clearTrigger();
    }
    delete this.variables[name];
  }

  getVariable(name: string) {
    return this.variables[name];
  }

  clearStorage() {
    this.variables = {};
  }
}