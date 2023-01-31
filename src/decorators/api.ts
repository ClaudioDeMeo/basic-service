import { ApiConfig } from '../interfaces'
import { ControllerHandler, CONTROLLER_METHOD } from '../interfaces/controller';

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

export const GET = (path: string): ((...args: any) => void) => {
    return API({
        method: CONTROLLER_METHOD.GET,
        path: path
    });
}

export const POST = (path: string): ((...args: any) => void) => {
    return API({
        method: CONTROLLER_METHOD.POST,
        path: path
    });
}

export const PUT = (path: string): ((...args: any) => void) => {
    return API({
        method: CONTROLLER_METHOD.PUT,
        path: path
    });
}

export const DELETE = (path: string): ((...args: any) => void) => {
    return API({
        method: CONTROLLER_METHOD.DELETE,
        path: path
    });
}