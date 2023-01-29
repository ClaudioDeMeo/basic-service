import express, { Application, Router } from 'express';
import morgan from 'morgan';
import { Controller } from '../../interfaces/controller';
import { ServerApplication } from '../../interfaces/server-application';
import swaggerUi from 'swagger-ui-express';

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

    private routerControllerMap: RouterControllerMap = {};

    public constructor(){
        this.app = express();
        this.app.use(express.json());
        this.app.use(morgan('tiny'));
    }

    public listen(port?: string | number, callback?: () => void): void {
        this.app.listen(port, callback);
    }

    public addMiddleware(middleware: (...args: any) => void): void {
        this.app.use(middleware);
    }

    public addController(controller: Controller): void {
        const router = express.Router();

        this.app.use(router);

        this.routerControllerMap[controller.name] = {
            router: router,
            controller: controller
        }
    }

    public addControllerHandler(controllerName: string, method: string, path: string, handler: (...args: any) => void): void {
        throw new Error('Method not implemented.');
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