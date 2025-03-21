import container from "@/config/inversify";
import SERVICE_IDENTIFIER from '@/config/identifiers/services';
import { DatasourceFactory } from "./DataSourceFactory";

const datasources = new Map<string, IDataRetrieveable>();

export default class DatasourceRepository implements IDatasourceRepository {
  private availableDatasources: Record<string, StoreIdentifiers> = {};

  constructor() {}

  removeDatasource(datasourceId: string): void {
    if (datasources.has(datasourceId)) {
      const datasource = datasources.get(datasourceId);
      console.log(datasource);
      datasource?.destroy();

      datasources.delete(datasourceId);
    }
  }

  getDatasource(datasourceId: string): IDataRetrieveable {
    const datasource = datasources.get(datasourceId);
    if (!datasource) throw new Error(`Store with id ${datasourceId} not found`);

    return datasource;
  }

  registerDatasourceType(name: string, identifiers: StoreIdentifiers): void {
    this.availableDatasources[name] = identifiers;
  }

  get registeredDatasources(): String[] {
    return Object.keys(this.availableDatasources);
  }

  getDatasourceIdentifiers(type: string): StoreIdentifiers {
    return this.availableDatasources[type];
  }

  registerDatasource(datasourceId: string, type: string, config: any): void {
    const identifiers = this.availableDatasources[type];
    const factory = container.get<DatasourceFactory>(SERVICE_IDENTIFIER.DatasourceFactory);

    if (identifiers) {
      const datasource = factory.createDatasource<IDataRetrieveable>(identifiers.Store, config);
      datasources.set(datasourceId, datasource);
    }
  }
}
