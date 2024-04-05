import ImageWidget from "@/components/Widgets/Image/ImageWidget.vue";
import TextWidget from "@/components/Widgets/Text/TextWidget.vue";
import SvgWidget from "@/components/Widgets/Svg/SvgWidget.vue";
import RepeatableSvgWidget from "@/components/Widgets/RepeatableSvg/RepeatableSvgWidget.vue";
import ProgressWidget from "@/components/Widgets/Progress/ProgressWidget.vue";
import VideoWidget from "@/components/Widgets/Video/VideoWidget.vue";
import IconWidget from "@/components/Widgets/Icon/IconWidget.vue";
import RichTextWidget from "@/components/Widgets/RichText/RichTextWidget.vue";
import TableWidget from "@/components/Widgets/Table/TableWidget.vue";
import PivotTableWidget from "@/components/Widgets/PivotTable/PivotTableWidget.vue";

export const enabledWidgets = {
  ImageWidget,
  TextWidget,
  SvgWidget,
  RepeatableSvgWidget,
  ProgressWidget,
  VideoWidget,
  IconWidget,
  RichTextWidget,
  TableWidget,
  PivotTableWidget,
};

export const widgetNames = [
  { name: "ImageWidget", label: "Image Widget" },
  { name: "TextWidget", label: "Text Widget" },
  { name: "SvgWidget", label: "SVG Widget" },
  { name: "RepeatableSvgWidget", label: "Repeatable SVG Widget" },
  { name: "ProgressWidget", label: "Progress Widget" },
  { name: "VideoWidget", label: "Video Widget" },
  { name: "IconWidget", label: "Icon Widget" },
  { name: "RichTextWidget", label: "Rich Text Widget" },
  { name: "TableWidget", label: "Table Widget" },
  { name: "PivotTableWidget", label: "Pivot Table Widget" },
];

// TODO: move settings components def here
// export const settingsComponents = {
//  ImageWidget: ImageWidgetSettings,
// }
