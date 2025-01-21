import type { App } from "vue";
import DatasourceRepository from "./plugins/data/DatasourceRepository";

import SampleWidget from "./plugins/widgets/SampleWidget";
import DataTable from "./plugins/widgets/DataTable";
import TextWidget from "./plugins/widgets/TextWidget";
import PivotTableWidgetPlugin from "./plugins/widgets/PivotTable";
import ChartWidget from "./plugins/widgets/ChartWidget";
import ProgressWidgetPlugin from "./plugins/widgets/ProgressWidget";
import RepeatableSvgWidgetPlugin from "./plugins/widgets/RepeatableSvgWidget";
import RichTextWidgetPlugin from "./plugins/widgets/RichTextWidget";
import SvgWidgetPlugin from "./plugins/widgets/SvgWidget";
import IconWidgetPlugin from "./plugins/widgets/IconWidget";
import ImageWidgetPlugin from "./plugins/widgets/ImageWidget";
import VideoWidgetPlugin from "./plugins/widgets/VideoWidget";

interface WidgetsConfig {
  datasourceRepository: DatasourceRepository;
}

export function initWidgets(app: App, { datasourceRepository }: WidgetsConfig) {
  app.use(SampleWidget(datasourceRepository));
  app.use(DataTable(datasourceRepository));
  app.use(TextWidget(datasourceRepository));
  app.use(PivotTableWidgetPlugin(datasourceRepository));
  app.use(ChartWidget(datasourceRepository));
  app.use(ProgressWidgetPlugin(datasourceRepository));
  app.use(RepeatableSvgWidgetPlugin(datasourceRepository));
  app.use(RichTextWidgetPlugin(datasourceRepository));
  app.use(SvgWidgetPlugin(datasourceRepository));
  app.use(IconWidgetPlugin(datasourceRepository));
  app.use(ImageWidgetPlugin(datasourceRepository));
  app.use(VideoWidgetPlugin(datasourceRepository));
}
