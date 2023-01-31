import { Controller, ControllerHandler } from './controller';

export interface ServerApplication {

    listen(port?: string | number, callback?: () => void): void;

    close(): void;

    addMiddleware(middleware: (...args: any) => void): void

    addController(controller: Controller): void;

    addControllerHandlers(controllerid: string, controllerHandler: ControllerHandler | ControllerHandler[]): void;

    prepareSwagger(path?: string, location?: string): void;

}