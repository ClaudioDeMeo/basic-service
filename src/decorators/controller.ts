import { ServerSingleton } from '../server';

/**
 * Decorator that marks a class as a controller.
 *
 * @param {string} [id] - The name of the controller. Will be used as router. If not provided will be used the name of the class.
 *
 * @return {Function}
 */
export function Controller(id?: string){
    return (target: any): void => {
        const server = ServerSingleton.getInstance();

        target.prototype.id = id || target.name;

        server.addController(new target());
    }
}