import { ServiceConfig, Controller } from './interfaces';
import { ServerSingleton } from '../server';
import { ServerApplication } from '../server/interfaces';

/**
 * Rappresents the basic class to build a microservice. Just use this class or extend it to create a new service and execute the method run to start it.
 */
export class BasicService{

    /**
     * Optional On Server Listen callback
     *
     * @protected
     */
    protected run?: ()=> void;

    private readonly server: ServerApplication;
    private readonly serviceConfig?: ServiceConfig;
    private controllers?: Controller[] = [];

    /**
     * Creates a new BasicService.
     * @param {ServiceConfig} [serviceConfig] - The service configuration.
     * @param {Controller[]} [controllers] - The list of controllers.
     */
    public constructor(serviceConfig?: ServiceConfig, controllers?: Controller[]) {
        if (serviceConfig){
            this.serviceConfig = serviceConfig;
        }

        if (controllers){
            this.controllers = controllers;
        }

        this.server = ServerSingleton.getInstance(serviceConfig?.serverType);
        this.attachSwaggerToServer();
        this.attachControllers(this.controllers);
    }

    private attachSwaggerToServer(): void {
        if (this.serviceConfig?.swagger !== false){
            this.server.addSwagger(this.serviceConfig?.docsPath, this.serviceConfig?.swaggerLocation);
        }
    }

    /**
     * Allow to attach new controllers to the server.
     * @param {Controller | Controller[]} [controllers] - The list of controllers.
     */
    public attachControllers(controllers?: Controller | Controller[]): void {
        if (controllers){
            const controllerArray = Array.isArray(controllers) ? controllers : [controllers];

            controllerArray?.forEach((controller: Controller): void => {
                this.server.addController(controller);
                this.addController(controller);
            });
        }
    }

    private addController(controller: Controller): void {
        if (!this.controllers){
            this.controllers = [];
        }

        this.controllers.push(controller);
    }

    /**
     * Allow the service to start listen for requests.
     */
    public listen(): void {
        this.server.listen(this.serviceConfig?.port, this.run);
    }

}