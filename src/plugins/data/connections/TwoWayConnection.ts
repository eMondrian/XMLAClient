type PubSubSubsriber = (event: PubSubEvents, data?: any, topic?: string) => void;

export default abstract class TwoWayConnection implements PubSubConnection {
    abstract setConfig(config: any): void;
    private ready = false;
    private subscribers: PubSubSubsriber[] = [];

    constructor() {
    }

    onMessage(data: any, topic?: string) {
        this.notify("message", data, topic);
    }

    onConnect() {
        this.ready = true;
        this.notify("connect");
    }

    onClose() {
        this.ready = false;
        this.notify("close");
    }

    onError(error: any) {
        this.ready = false;
        this.notify("error", error);
    }

    subscribe(subscriber: (event: PubSubEvents, data?: any, topic?: string) => any) {
      this.subscribers.push(subscriber);
    }
  
    unsubscribe(subscriber: () => any) {
      this.subscribers = this.subscribers.filter(sub => sub !== subscriber);
    }
  
    notify(event: PubSubEvents, data?: any, topic?: string) {
      this.subscribers.forEach((subscriber) => {
        subscriber(event, data, topic);
      })
    }

    abstract hasTopics(): boolean;
}