export  default abstract class BaseDatasource implements IDataRetrieveable {
  private subscribers: any[] = [];

  subscribe(subscriber: () => any) {
    this.subscribers.push(subscriber);
  }

  unsubscribe(subscriber: () => any) {
    this.subscribers = this.subscribers.filter(sub => sub !== subscriber);
  }

  notify() {
    this.subscribers.forEach((subscriber) => {
      subscriber();
    })
  }

  abstract getData<T extends keyof DataMap>(type: T): Promise<DataMap[T]>;
  abstract getOriginalData(): any;
  abstract callEvent(event: string, params: any): void;
}