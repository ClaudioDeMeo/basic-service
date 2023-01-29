export interface Controller {
    name: string;
    instance: (...args: any[]) => any
}