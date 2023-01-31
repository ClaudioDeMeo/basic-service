import { Server } from '../basic-service/server';

/**
 * Decorator that marks a class as a controller.
 *
 * @param {string} [name] - The name of the controller. Will be used as router. If not provided will be used the name of the class.
 *
 * @return {Function}
 */
export function Controller(name?: string){
    return (target: any): void => {
        const server = Server.getInstance();

        target.prototype.id = name || target.name;

        server.addController({
            name: name || target.name,
            instance: new target(),
            handler: target.prototype.handler
        });
    }
}