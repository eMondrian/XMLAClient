export  default abstract class BaseConnection implements IConnection {
  abstract fetch(config: IRequestParams): Promise<any>;
  abstract setConfig(config: any): void;

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

}