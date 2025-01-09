export interface IWidget {
  uid: string,
  type: string,
  wrapperConfig: IWrapperSettings,
  config: {
    datasourceId: string,
    settings: {}
  }
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
  gradientColor: string;
  backgroundColor: string;
  isGradient: boolean;
  isVertical: boolean;
  rotation: number;
}