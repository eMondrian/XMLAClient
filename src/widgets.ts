import type { App } from "vue";
import type DatasourceRepository from "./plugins/data/DatasourceRepository";

import SampleWidget from "./plugins/widgets/SampleWidget";
import DataTable from "./plugins/widgets/DataTable";
import TextWidget from "./plugins/widgets/TextWidget";
import PivotTableWidgetPlugin from "./plugins/widgets/PivotTable";
import ChartWidget from "./plugins/widgets/ChartWidget";

interface WidgetsConfig {
  datasourceRepository: DatasourceRepository;
}

export function initWidgets(app: App, { datasourceRepository }: WidgetsConfig) {
  app.use(SampleWidget(datasourceRepository));
  app.use(DataTable(datasourceRepository));
  app.use(TextWidget(datasourceRepository));
  app.use(PivotTableWidgetPlugin(datasourceRepository));
  app.use(ChartWidget(datasourceRepository));
}