import express, { Application, Router } from 'express';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import { Server } from 'http';

import { ServerApplication } from '../interfaces';
import { Controller, ControllerHandler } from '../../basic-controller/interfaces/controller';

/**
 * Router/Controller Dictionary
 *
 * @property {Router} router - the express Router
 * @property {Controller} controller
 */
interface RouterControllerMap {
    [key: string]: {
        router: Router;
        controller: Controller;
    }
}

/**
 * @ignore
 */
const DEFAULT_SWAGGER_PATH = '/docs';
/**
 * @ignore
 */
const DEFAULT_SWAGGER_LOCATION = 'swagger';
/**
 * @ignore
 */
const DEFAULT_SWAGGER_URL = '/swagger.json';

/**
 * The Express server abstraction class.
 *
 * @implements {ServerApplication}
 */
export class ExpressServer implements ServerApplication {

    private readonly app: Application;

    private server: Server;

    private routerControllerMap: RouterControllerMap = {};

    /**
     * Creates a new ExpressServer.
     */
    public constructor() {
        this.app = express();
        this.app.use(express.json());
        this.app.use(morgan('tiny'));
    }

    /**
     * Allow the server to start listen for requests.
     *
     * @param {(string | number)} [port] - the listen port of the server.
     * @param {Function} [callback] - the on listen callback.
     */
    public listen(port?: string | number, callback?: () => void): void {
        this.server = this.app.listen(port, callback);
    }

    /**
     * Close the server.
     */
    public close(): void {
        this.server?.close();
    }

    /**
     * Add middleware to the server.
     *
     * @param {Function} middleware
     */
    public addMiddleware(middleware: (...args: any) => void): void {
        this.app.use(middleware);
    }

    /**
     * Add API controller
     *
     * @param {Controller} controller
     */
    public addController(controller: Controller): void {
        if (this.routerControllerMap[controller.id]) {
            throw new Error('controller already presents');
        }

        const router = this.createRouterForController(controller);

        if (controller.handlers) {
            this.addControllerHandlers(controller.id, controller.handlers);
        }

        this.app.use(router);
    }

    private createRouterForController(controller: Controller): Router {
        const router = express.Router();

        this.routerControllerMap[controller.id] = {
            router: router,
            controller: controller
        };

        return router;
    }

    private addControllerHandlers(controllerid: string, controllerHandlers: ControllerHandler | ControllerHandler[]): void {
        if (!this.routerControllerMap[controllerid]) {
            throw new Error('controller not found');
        }

        if (!Array.isArray(controllerHandlers)){
            controllerHandlers = [controllerHandlers];
        }

        const router = this.routerControllerMap[controllerid].router;
        const controller = this.routerControllerMap[controllerid].controller;

        controllerHandlers.forEach((controllerHandler: ControllerHandler): void => {
            const method = controllerHandler.method;
            const path = controllerHandler.path;
            const handler = controllerHandler.handler;

            router[method](path, async(req: any, res: any) => {
                const response = await controller[handler]?.(req);

                return res.send(response);
            });

            if (!this.routerControllerMap[controllerid].controller.handlers){
                this.routerControllerMap[controllerid].controller.handlers = [];
            }

            if (this.routerControllerMap[controllerid].controller.handlers?.indexOf(controllerHandler) === -1){
                this.routerControllerMap[controllerid].controller.handlers?.push(controllerHandler);
            }
        });
    }

    /**
     * Expose the swagger API.
     *
     * @param {string} [path] - the path of the swagger api.
     * @param {string} [location] -  the direcotry of the swagger.
     */
    public addSwagger(path: string = DEFAULT_SWAGGER_PATH, location: string = DEFAULT_SWAGGER_LOCATION): void {
        this.app.use(express.static(location));
        this.app.use(
            path,
            swaggerUi.serve,
            swaggerUi.setup(undefined, {
                swaggerOptions: {
                    url: DEFAULT_SWAGGER_URL,
                }
            })
        );
    }

}