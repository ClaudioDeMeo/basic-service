import { Server } from '../basic-service/server';

export const Controller = (name?: string) => {
    return (target: any): void => {
        const server = Server.getInstance();

        target.prototype.id = name || target.name;

        server.addController({
            name: name || target.name,
            instance: new target.constructor(),
            handler: target.prototype.handler
        });
    }
}