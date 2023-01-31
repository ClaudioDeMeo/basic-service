import { ServiceConfig } from '../interfaces';

/**
 * Decorator that marks a class as a service. The class must extens `BasicService`
 *
 * @param {ServiceConfig} serviceConfig - The service configuration.
 * @param {Function} [run] - The listen callback. If provider the service will be instantiate automatically.
 *
 * @return {Function}
 */
export function Service(serviceConfig: ServiceConfig, run?: () => void){
    return (target: any): void => {
        target.prototype.serviceConfig = serviceConfig;

        if (run){
            const service = new target.prototype.constructor(serviceConfig);

            service.run(run);
        }
    }
}