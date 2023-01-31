import { ServiceConfig } from '../interfaces';
import { ServerApplication } from '../interfaces/server-application';
import { Server } from './server';

/**
 * Rappresents the basic class to build a microservice. Just use this class or extend it to create a new service and execute the method run to start it.
 */
export class BasicService{

    private readonly serviceConfig: ServiceConfig;

    /**
     * The server application instance.
     * @type {ServerApplication}
     * @protected
     */
    protected readonly server: ServerApplication;

    /**
     * Creates a new BasicService.
     * @param {ServiceConfig} [serviceConfig] - The service configuration.
     */
    public constructor(serviceConfig?: ServiceConfig) {
        if (serviceConfig){
            this.serviceConfig = serviceConfig;
        }

        this.server = Server.getInstance();

        if (this.serviceConfig?.swagger !== false){
            this.server.prepareSwagger(serviceConfig?.docsPath, serviceConfig?.swaggerLocation);
        }
    }
    /**
     * Allow the service to start listen for requests.
     *
     * @param {() => void} [callback] - optional callback on listen.
     */
    public run(callback?: () => void): void {
        this.server.listen(this.serviceConfig?.port, callback);
    }

}