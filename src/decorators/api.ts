import { Server } from '../basic-service/server';
import { ApiConfig } from '../interfaces'
import { ControllerHandler } from '../interfaces/controller';

export const API = (config: ApiConfig) => {
    return (target: any, propertyKey: string): void => {
        const controllerHandler: ControllerHandler = {
            method: config.method,
            path: config.path,
            handler: propertyKey
        };

        if (!target.constructor.prototype.handler){
            target.constructor.prototype.handler = [];
        }

        target.constructor.prototype.handler.push(controllerHandler);
    }
}