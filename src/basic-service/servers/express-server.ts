import express, { Application, Router } from 'express';
import morgan from 'morgan';
import { Controller, ControllerHandler } from '../../interfaces/controller';
import { ServerApplication } from '../../interfaces/server-application';
import swaggerUi from 'swagger-ui-express';
import { Server } from 'http';

interface RouterControllerMap {
    [key: string]: {
        router: Router;
        controller: Controller;
    }
}

const DEFAULT_SWAGGER_PATH = '/docs';
const DEFAULT_SWAGGER_LOCATION = 'public';
const DEFAULT_SWAGGER_URL = '/swagger.json';

export class ExpressServer implements ServerApplication {

    private readonly app: Application;

    private server: Server;

    private routerControllerMap: RouterControllerMap = {};

    public constructor() {
        this.app = express();
        this.app.use(express.json());
        this.app.use(morgan('tiny'));
    }

    public listen(port?: string | number, callback?: () => void): void {
        this.server = this.app.listen(port, callback);
    }

    public close(): void {
        this.server?.close();
    }

    public addMiddleware(middleware: (...args: any) => void): void {
        this.app.use(middleware);
    }

    public addController(controller: Controller): void {
        if (this.routerControllerMap[controller.name]) {
            throw new Error('controller already presents');
        }

        const router = express.Router();

        this.routerControllerMap[controller.name] = {
            router: router,
            controller: controller
        };
        if (controller.handler) {
            this.addControllerHandlers(controller.name, controller.handler);
        }

        this.app.use(router);
    }

    public addControllerHandlers(controllerid: string, controllerHandlers: ControllerHandler | ControllerHandler[]): void {
        if (!Array.isArray(controllerHandlers)){
            controllerHandlers = [controllerHandlers];
        }

        const router = this.routerControllerMap[controllerid].router;
        const controller = this.routerControllerMap[controllerid].controller.instance;

        controllerHandlers.forEach((controllerHandler: ControllerHandler): void => {
            const method = controllerHandler.method;
            const path = controllerHandler.path;
            const handler = controllerHandler.handler;

            router[method](path, async(req: any, res: any) => {
                const response = await controller[handler](req);

                return res.send(response);
            });

            if (!this.routerControllerMap[controllerid].controller.handler){
                this.routerControllerMap[controllerid].controller.handler = [];
            }

            this.routerControllerMap[controllerid].controller.handler?.push(controllerHandler);
        });
    }

    public prepareSwagger(path: string = DEFAULT_SWAGGER_PATH, location: string = DEFAULT_SWAGGER_LOCATION): void {
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