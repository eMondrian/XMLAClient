import { type Component } from "vue";

export interface CollapseState {
  textSection?: boolean;
  storeSection?: boolean;
}

export interface FillColor {
  backgroundColor?: string;
  backgroundGradient?: string;
}

export interface ImageGalleryItem {
  id?: string;
  url?: string;
}

export interface ImageSettings {
  fit?: string;
  diashowInterval?: number;
}

export interface ItemStyles {
  fill?: string;
  stroke?: string;
}
export interface GradientPart {
  color?: string;
  location?: number;
}

export interface ConfigItem {
  fill?: string;
  stroke?: string;
  strokeWidth?: string;
}

export interface Config {
  [className: string]: ConfigItem;
}

export interface StyleFields {
  className?: string;
  fill?: string;
  stroke?: string;
  strokeWidth?: string;
}

export interface ObjectFitSetting {
  fit?: string;
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

export interface IconSharingComponentProps {
  component: {
    currentIcon?: string;
    iconColor?: string;
    iconSize?: number;
    isIconFilled?: boolean;
    strokeWeight?: number;
    opticSize: number;
    grade?: number;
    settings?: Component;
  }
}

export interface IconComponentProps {
  initialState?: object;
  currentIcon?: string;
  iconColor?: string;
  iconSize?: number;
  isIconFilled?: boolean;
  strokeWeight?: number;
  opticSize?: number;
  grade?: number;
}

export interface ProgressSharingComponentProps {
  component: {
    progress?: number | string;
    fillColor?: {
      backgroundColor: string;
      backgroundGradient: string;
    };
    isGradient?: boolean;
    isVertical?: boolean;
    backgroundColor?: string;
    rotation?: number;
    storeId?: string;
    getState?: () => any;
    setState?: (state: any) => void;
    settings?: Component;
  }
}


export interface ProgressComponentProps {
  initialState?: object;
  progress?: number | string;
  fillColor?: {
    backgroundColor: string;
    backgroundGradient: string;
  };
  backgroundColor?: string;
  isGradient?: boolean;
  isVertical?: boolean;
  rotation?: number;
}

export interface ImageComponentProps {
  initialState?: object;
  imgSrc?: string;
}

export interface ImageSharingComponentProps {
  component: {
    imgSrc?: string;
    settings?: Component;
    getState?: () => any;
    setState?: (state: any) => void;
    images?: any[];
    imageSettings?: ImageSettings;
    storeId?: string;
  }
}

export interface RepeatableSvgComponentProps {
  initialState?: object;
  src?: string;
  activeItemStyles?: ItemStyles;
  defaultItemStyles?: ItemStyles;
  repeations?: string;
  progress?: string;
}

export interface RepeatableSvgSharingComponentProps {
  component: {
    src?: string;
    activeItemStyles?: ItemStyles;
    defaultItemStyles?: ItemStyles;
    progress?: string;
    repeations?: string;
    storeId?: string;
    settings?: Component;
    getState?: () => any;
  }
}

export interface RichTextComponentProps {
  initialState?: object;
  editor?: string;
}

export interface RichTextSharingComponentProps {
  component: {
    editor?: string;
    getState?: () => any;
    storeId?: string;
    settings?: Component;
  }
}

export interface SvgComponentProps {
  initialState?: object;
  src?: string;
  classesConfig?: Config;
}

export interface SvgSharingComponentProps {
  component: {
    src: string;
    classesConfig: Config;
    storeId: string;
    settings: Component;
    getState: () => any;
  }
}

export interface TextComponentProps {
  initialState?: object;
  text?: string;
  fontSize?: number;
  fontColor?: string;
  fontWeight?: string;
  textDecoration?: string;
  horizontalAlign?: string;
  verticalAlign?: string;
}

export interface TextSharingComponentProps {
  component: {
    text?: string;
    fontSize?: number;
    fontColor?: string;
    fontWeight?: string;
    textDecoration?: string;
    horizontalAlign?: string;
    verticalAlign?: string;
    storeId?: string;
    settings?: Component;
    getState?: () => any;
    setState?: (state: any) => void;
  }
}

export interface VideoComponentProps {
  initialState?: object;
  videoUrl?: string;
}

export interface VideoSharingComponentProps {
  component?: {
    videoUrl?: string;
    videoSettings?: ObjectFitSetting;
    storeId?: string;
    settings?: Component;
    getState?: () => any;
  }
}