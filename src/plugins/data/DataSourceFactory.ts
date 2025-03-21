import ConnectionRepository from "./ConnectionRepository";
import DatasourceRepository from "./DatasourceRepository";
import type { VariableStorage } from "../variables/VariableStorage";
import container from "@/config/inversify";
import SERVICE_IDENTIFIER from '@/config/identifiers/services';


export class DatasourceFactory {
    private datasourceRepository: DatasourceRepository;
    private connectionRepository: ConnectionRepository;
    private variableStorage: VariableStorage;

    constructor() {
        this.datasourceRepository = container.get(SERVICE_IDENTIFIER.DatasourceRepository);
        this.connectionRepository = container.get(SERVICE_IDENTIFIER.ConnectionRepository);
        this.variableStorage = container.get(SERVICE_IDENTIFIER.VariablesStorage);
    }

    createDatasource<T>(identifier: symbol, configuration: any): T {
        const ctor = container.get<StoreConstructor<T>>(identifier);

        if (ctor.validateConfiguration(configuration)) {
            return new ctor({
                connectionRepository: this.connectionRepository,
                datasourceRepository: this.datasourceRepository,
                variableStorage: this.variableStorage,
                ...configuration
            });
        } else {
            console.warn('Invalid configuration', configuration);
            return null as unknown as T;
        }
    }
}