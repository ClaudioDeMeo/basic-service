import { ApiConfig } from './interfaces';
import { ControllerHandler, CONTROLLER_METHOD } from '../basic-service/interfaces';

/**
 * Decorator that marks a method as an API.
 *
 * @param {ApiConfig} config - The configuration of the API.
 *
 * @return {Function}
 */
export function API(config: ApiConfig){
    return (target: any, propertyKey: string): void => {
        const controllerHandler: ControllerHandler = {
            method: config.method,
            path: config.path,
            handler: propertyKey
        };

        if (!target.constructor.prototype.handlers){
            target.constructor.prototype.handlers = [];
        }

        target.constructor.prototype.handlers.push(controllerHandler);
    }
}

/**
 * Decorator that marks a method as a GET API.
 *
 * @param {string} path - The path of the API.
 *
 * @return {Function}
 */
export function GET(path: string): ((...args: any) => void){
    return API({
        method: CONTROLLER_METHOD.GET,
        path: path
    });
}

/**
 * Decorator that marks a method as a POST API.
 *
 * @param {string} path - The path of the API.
 *
 * @return {Function}
 */
export function POST(path: string): ((...args: any) => void){
    return API({
        method: CONTROLLER_METHOD.POST,
        path: path
    });
}

/**
 * Decorator that marks a method as a PUT API.
 *
 * @param {string} path - The path of the API.
 *
 * @return {Function}
 */
export function PUT(path: string): ((...args: any) => void){
    return API({
        method: CONTROLLER_METHOD.PUT,
        path: path
    });
}

/**
 * Decorator that marks a method as a DELETE API.
 *
 * @param {string} path - The path of the API.
 *
 * @return {Function}
 */
export function DELETE(path: string): ((...args: any) => void){
    return API({
        method: CONTROLLER_METHOD.DELETE,
        path: path
    });
}