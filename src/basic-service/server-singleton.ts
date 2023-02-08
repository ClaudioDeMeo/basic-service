import { ServerApplication } from '../interfaces/server-application';
import { ServerFactory, SERVER_TYPE } from './server-factory';

/**
 * Abstract static singleton class to create an unique server instance.
 *
 * @abstract
 */
export class ServerSingleton{

    private static app: ServerApplication;

    /**
     * Singleton method that return the unique server application instance.
     *
     * @static
     * @param {SERVER_TYPE} [type=SERVER_TYPE.EXPRESS]
     * @return {ServerApplication}
     */
    public static getInstance(type: SERVER_TYPE = SERVER_TYPE.EXPRESS): ServerApplication{
        if (!this.app){
            this.app = ServerFactory.createServer(type);
        }

        return this.app;
    }

}