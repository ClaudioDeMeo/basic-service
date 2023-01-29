import { Server } from '../basic-service/server';

export const Controller = (name?: string) => {
    return (target: any): void => {
        const server = Server.getInstance();

        target.prototype.id = name || target.constructor.name;

        server.addController({
            name: target.prototype.id,
            instance: new target.constructor()
        });
    }
}