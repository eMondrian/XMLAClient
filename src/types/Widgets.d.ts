import type DatasourceRepository from "@/plugins/data/DatasourceRepository";

export interface IWidget {
    uid: string;
    type: string;
    wrapperConfig: IWrapperSettings;
    config: {
        datasourceId: string;
        settings: {};
    };
}

export interface WidgetConfig {
    component: any;
    settingsComponent?: any;
    supportedDSTypes: string[];
    icon: string;
    datasource?: DatasourceRepository;
}

export interface IWrapperSettings {
    title?: string;
    backgroundColor?: string;
    backgroundColorTransparence?: number;
    titleColor?: string;
    titleFontSize?: number;
    borderSize?: number;
    borderColor?: string;
    borderRadius?: number;
    fullscreen?: boolean;
    shadowColor?: string;
    shadowBlur?: number;
    shadowX?: number;
    shadowY?: number;
    shadowTransparence?: number;
    transparency?: number;
}

export interface ITextSettings {
    text: string;
    fontSize: number;
    fontColor: string;
    fontWeight: string;
    fontStyle: string;
    textDecoration: string;
    horizontalAlign: string;
    verticalAlign: string;
}

export interface IProgressSettings {
    progress: string;
    fillColor: string;
    gradientColor?: string;
    backgroundColor: string;
    isGradient: boolean;
    isVertical: boolean;
    rotation: number;
}

export interface IIconSettings {
    currentIcon: string;
    iconColor: string;
    iconSize: number;
    isIconFilled: boolean;
    strokeWeight: number;
    opticSize: number;
    grade: number;
}

export interface IImageSettings {
    imagesSettings: GallerySettings;
    images: ImageGalleryItem[];
}

export interface ISvgSettings {
    src: string;
    classesConfig: Config;
}

export interface Config {
    [className: string]: ConfigItem;
}

export interface ConfigItem {
    fill: string;
    stroke: string;
    strokeWidth: string;
}

export interface IRepeatableSVGSettings {
    src: string;
    activeItemStyles: {
        fill: string;
        stroke: string;
    };
    defaultItemStyles: {
        fill: string;
        stroke: string;
    };
    repeations: string;
    progress: string;
}

export interface IRichTextEditorSettings {
    editor: string;
}

export interface ObjectFitSetting {
    fit: string;
}

export interface IVideoSettings {
    videoSettings: ObjectFitSetting;
    videoUrl: string;
}

export interface ImageGalleryItem {
    id: string;
    url: string;
}

export interface GallerySettings {
    fit: string;
    diashowInterval: number;
}

export interface MaterialIcon {
    name: string;
    version?: number;
    popularity?: number;
    codepoint?: number;
    unsupported_families?: string[];
    categories?: string[];
    tags?: string[];
    sizes_px?: number[];
}

export interface ImageGalleryItem {
    id: string;
    url: string;
}

interface GradientPart {
    color: string;
    location: number;
}
