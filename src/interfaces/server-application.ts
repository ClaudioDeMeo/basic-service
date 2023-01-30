import { Controller, ControllerHandler } from './controller';

export interface ServerApplication {

    listen(port?: string | number, callback?: () => void): void;

    close(): void;

    addMiddleware(middleware: (...args: any) => void): void

    addController(controller: Controller): void;

    addControllerHandler(controllerid: string, controllerHandler: ControllerHandler): void;

    prepareSwagger(path?: string, location?: string): void;

}