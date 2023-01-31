import { ServiceConfig } from '../interfaces';

export const Service = (serviceConfig: ServiceConfig, run?: () => void) => {
    return (target: any): void => {
        target.prototype.serviceConfig = serviceConfig;

        if (run){
            const service = new target.prototype.constructor(serviceConfig);

            service.run(run);
        }
    }
}