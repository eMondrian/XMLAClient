import { XMLAApi } from "@/utils/xml";
import { createClientAsync } from "@/utils/XMLAClient";
import { MetadataStore } from "./MetadataStore";
import BaseConnection, { type BaseConnectionConfig } from "../BaseConnection";

export interface IXmlaConnectionConfiguration extends BaseConnectionConfig {
  url: string;
  cubeName: string;
  catalogName: string;
}

export default class XmlaConnection extends BaseConnection {
  public readonly url: any;
  public readonly catalogName: string;
  public cubeName: string;
  public metadata: MetadataStore = null as unknown as MetadataStore;

  private api: XMLAApi | null = null;
  private apiPromise: Promise<XMLAApi>;
  private metadataPromise: Promise<MetadataStore>;

  constructor(configuration: IXmlaConnectionConfiguration) {
    super(configuration);

    this.url = configuration.url;
    this.catalogName = configuration.catalogName;
    this.cubeName = configuration.cubeName;

    this.apiPromise = this.initApi();
    this.apiPromise.then((api) => {
      this.api = api;
    });

    this.metadataPromise = this.initMetadata();
    this.metadataPromise.then((metadataStore) => {
      this.metadata = metadataStore;
    });
  }

  async initApi(): Promise<XMLAApi> {
    const client = await createClientAsync("/def/xmla.wsdl");

    client.setEndpoint(this.url);
    const api = new XMLAApi(client, this.url);
    await api.startSession();

    return api;
  }

  async initMetadata(): Promise<MetadataStore> {
    const api = await this.apiPromise;
    const metadataStore = new MetadataStore(api);
  
    await metadataStore.loadMetadata(this.catalogName, this.cubeName);
    return metadataStore;
  }

  async fetch(config: IRequestParams): Promise<any> {
    const api = await this.apiPromise;
    const mdxResponce = await api.getMDX(config.data.mdx);
    return mdxResponce;
  }

  setConfig(): void {
    throw new Error("Method not implemented.");
  }

  static validateConfiguration(configuration: IXmlaConnectionConfiguration) {
    if (!configuration.url) {
      return false;
    }

    if (!configuration.catalogName) {
      return false;
    }

    if (!configuration.cubeName) {
      return false;
    }

    return true;
  }

  static async getCubes(url: string, catalogName: string): Promise<MDSchemaCube[]> {
    const client = await createClientAsync("/def/xmla.wsdl");

    client.setEndpoint(url);
    const api = new XMLAApi(client, url);
    await api.startSession();

    const { cubes } = await api.getCubes(catalogName);
    return cubes;
  }

  static async getCatalogs(url: string): Promise<DBSchemaCatalog[]> {
    const client = await createClientAsync("/def/xmla.wsdl");

    client.setEndpoint(url);
    const api = new XMLAApi(client, url);
    await api.startSession();

    const { catalogs } = await api.getCatalogs();
    return catalogs;
  }

  async getProperties(): Promise<any[]> {
    await this.metadataPromise;
    return this.metadata.getProperties();
  }

  async getLevels(): Promise<any[]> {  
    await this.metadataPromise;
    return this.metadata.getLevels();
  }

  async getMember(parentLevel: MDSchemaLevel, parentName: string): Promise<any> {
    await this.metadataPromise;
    await this.apiPromise;

    if (this.api) {
       return await this.api.getMember(parentLevel, parentName);
    } else {
      throw new Error("API is not initialized");
    }
  }
}