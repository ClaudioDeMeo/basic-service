import { Controller, ControllerHandler } from './controller';

/**
 * Rappresent the Server application.
 * @property {Function} listen - Allow the server to start listen for requests.
 * @property {Function} close - Close the server.
 * @property {Function} addMiddleware - Add middleware to the server.
 * @property {Function} addController - Add API controller.
 * @property {Function} addControllerHandlers - Add one or more API controller handlers.
 * @property {Function} prepareSwagger - Expose the swagger API.
 */
export interface ServerApplication {
    /**
     * Allow the server to start listen for requests.
     *
     * @param {(string | number)} [port] - the listen port of the server.
     * @param {Function} [callback] - the on listen callback.
     */
    listen(port?: string | number, callback?: () => void): void;

    /**
     * Close the server.
     */
    close(): void;

    /**
     * Add middleware to the server.
     *
     * @param {Function} middleware
     */
    addMiddleware(middleware: (...args: any) => void): void

    /**
     * Add API controller
     *
     * @param {Controller} controller
     */
    addController(controller: Controller): void;

    /**
     * Add one or more API controller handlers.
     *
     * @param {string} controllerid - the controller id.
     * @param {(ControllerHandler | ControllerHandler[])} controllerHandler - one or more handlers.
     */
    addControllerHandlers(controllerid: string, controllerHandler: ControllerHandler | ControllerHandler[]): void;

    /**
     * Expose the swagger API.
     *
     * @param {string} [path] - the path of the swagger api.
     * @param {string} [location] -  the direcotry of the swagger.
     */
    prepareSwagger(path?: string, location?: string): void;

}