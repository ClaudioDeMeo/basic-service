import { ServiceComposer } from './service-composer';
import { ServiceConfig } from '../basic-service/interfaces';

/**
 * Decorator that marks a class as a service. The class must extens `BasicService`
 *
 * @param {ServiceConfig} serviceConfig - The service configuration.
 * @param {Function} [run] - The listen callback. If provider the service will be instantiate automatically.
 *
 * @return {Function}
 */
export function Service(serviceConfig?: ServiceConfig){
    return (target: any): void => {
        if (serviceConfig){
            target.prototype.serviceConfig = serviceConfig;
        }

        const service = new target.prototype.constructor(serviceConfig);

        ServiceComposer.createService(service);
    }
}