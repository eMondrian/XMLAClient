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
import container from "./config/inversify";
import { WidgetRepository } from "./plugins/data/WidgetRepository";
import SERVICE_IDENTIFIER from "@/config/identifiers/services";

const widgetRepository = new WidgetRepository();
container
    .bind<WidgetRepository>(SERVICE_IDENTIFIER.WidgetRepository)
    .toConstantValue(widgetRepository);

export function initWidgets(app: App) {
    app.use(SampleWidget());
    app.use(DataTable());
    app.use(TextWidget());
    app.use(PivotTableWidgetPlugin());
    app.use(ChartWidget());
    app.use(ProgressWidgetPlugin());
    app.use(RepeatableSvgWidgetPlugin());
    app.use(RichTextWidgetPlugin());
    app.use(SvgWidgetPlugin());
    app.use(IconWidgetPlugin());
    app.use(ImageWidgetPlugin());
    app.use(VideoWidgetPlugin());
}
