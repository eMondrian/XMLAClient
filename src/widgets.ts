import type { App } from "vue";
import type DatasourceRepository from "./plugins/data/DatasourceRepository";

import SampleWidget from "./plugins/widgets/SampleWidget";

interface WidgetsConfig {
  datasourceRepository: DatasourceRepository;
}

export function initWidgets(app: App, { datasourceRepository }: WidgetsConfig) {
  app.use(SampleWidget(datasourceRepository));
}