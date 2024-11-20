export enum Types {
  Primitive = 'Primitive',
  Array = 'Array',
  Object = 'Object'
}

export enum SourceType {
  Constant = 'Constant',
  QueryParameter = 'Query parameter',
  SystemProperties = 'System properties',
  EnvironmentVariables = 'Environment variables',
  BrowserProperties = 'Browser properties',
  Time = 'Time',
  Expression = 'Expression',
  AsyncParameters = 'Async parameters'
}

export enum RefreshType {
  None = "None",
  Reactive = "Reactive",
  Interval = "Interval",
  Trigger = "Trigger",
}

export enum BrowserProperties {
  WindowWidth = "Window Width",
  WindowHeight = "Window Height",
  WindowPageXOffset = "Window pageX offset",
  WindowPageYOffset = "Window page Y offset",
  WindowScrollX = "Window scroll X",
  WindowScrollY = "Window scroll Y",
  WindowLocationHref = "Window location href",
  NavigatorLanguage = "Navigator Language",
  NavigatorPlatform = "Navigator Platform",
}