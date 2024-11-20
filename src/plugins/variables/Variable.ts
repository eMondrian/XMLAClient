import { VariableStorage } from './VariableStorage';
import { RefreshType } from '@/types/enum';

export class Variable {
  private subscribers: any[] = [];
  private innerValue: any;

  public intervalFn: () => any = () => {};
  public description: string = '';
  public storage: VariableStorage;
  private refreshInterval: number = 0;
  private refreshType: RefreshType = RefreshType.None;
  private refreshIntervalId: number = 0;
  private refreshTrigger: string = null as unknown as string;

  constructor(public name: string, storage: VariableStorage, config: IVariableConfig) {
    this.name = name;
    this.storage = storage;
    this.description = config.description;

    this.refreshInterval = config.refreshInterval || 0;
    this.refreshInterval = Math.max(this.refreshInterval, 300);
    this.refreshType = config.refreshType || RefreshType.None;
    this.refreshTrigger = config.refreshTrigger || null as unknown as string;

    if (this.refreshType === RefreshType.Interval) {
      if (this.refreshInterval) {
        this.refreshIntervalId = setInterval(() => {
          this.intervalFn();
        }, this.refreshInterval);
      }
    } else if (this.refreshType === RefreshType.Trigger) {
      if (this.refreshTrigger) {
          storage.eventBus.on(this.refreshTrigger, () => {
            this.intervalFn();
          })
      }
    };
  }

  set onInterval (onInterval: () => any) {
    this.intervalFn = onInterval;
  }

  get value(): any {
    return this.innerValue;
  }

  set value(value) {
    this.innerValue = value;
    this.subscribers.forEach(subscriber => subscriber());
  }

  subscribe(subscriber: () => any) {
    this.subscribers.push(subscriber);
  }

  unsubscribe(subscriber: () => any) {
    this.subscribers = this.subscribers.filter(sub => sub !== subscriber);
  }

  forceUpdate() {};

  clearInterval() {
    clearInterval(this.refreshIntervalId);
  }

  clearTrigger() {
    if (this.refreshTrigger) {
      this.storage.eventBus.off(this.refreshTrigger);
    }
  }
}