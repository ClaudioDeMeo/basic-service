import { Controller } from './controller';

export interface ServerApplication {

    listen(port?: string | number, callback?: () => void): void;

    addMiddleware(middleware: (...args: any) => void): void

    addController(controller: Controller): void;

    addControllerHandler(controllerName: string, method: string, path: string, handler: (...args: any) => void): void;

    prepareSwagger(path?: string, location?: string): void;

}