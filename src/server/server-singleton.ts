import { ServerApplication } from './interfaces';
import { ServerFactory, SERVER_TYPE } from './server-factory';

/**
 * Abstract static singleton class to create an unique server instance.
 *
 * @abstract
 */
export abstract class ServerSingleton{

    private static app: ServerApplication;
    private static factory: ServerFactory = new ServerFactory();

    /**
     * Allow to set the factory class to use to build the server application.
     *
     * @static
     */
    public static useFactory<T extends ServerFactory>(factory: T): void {
        if (!this.app){
            this.factory = factory;
        }
    }

    /**
     * Singleton method that return the unique server application instance.
     *
     * @static
     * @param {SERVER_TYPE} [type=SERVER_TYPE.EXPRESS]
     * @return {ServerApplication}
     */
    public static getInstance(type: SERVER_TYPE = SERVER_TYPE.EXPRESS): ServerApplication{
        if (!this.app){
            this.app = this.factory.createServer(type);
        }

        return this.app;
    }

}