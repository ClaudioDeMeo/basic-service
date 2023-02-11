import { ServiceComposer } from './service-composer';
import { BasicService } from '../basic-service';

/**
 * Decorator that marks a class as a controller.
 *
 * @param {string} [id] - The name of the controller. Will be used as router. If not provided will be used the name of the class.
 *
 * @return {Function}
 */
export function Controller(id?: string, service?: BasicService){
    return (target: any): void => {
        target.prototype.id = id || target.name;

        if (service){
            ServiceComposer.createService(service);
        }

        ServiceComposer.addController(new target());
    }
}