import { ServerApplication } from '../interfaces/server-application';
import { ExpressServer } from './servers/express-server';

/**
 * @ignore
 */
export enum SERVER_TYPE {
    /** @value EXPRESS */
    EXPRESS = 'EXPRESS'
}

/**
 * @ignore
 */
enum SERVER_METHOD {
    EXPRESS = 'createExpressServer'
}

/**
 * Abstract static singleton class to create an unique server instance.
 *
 * @abstract
 */
export abstract class Server{

    private static serverType: SERVER_TYPE;
    private static app: ServerApplication;

    private static createExpressServer(): ExpressServer {
        return new ExpressServer();
    }

    /**
     * Facotry method that allow to select or change the server type.
     *
     * @static
     * @param {SERVER_TYPE} [type=SERVER_TYPE.EXPRESS]
     * @param {boolean} [force]
     */
    public static useServer(type: SERVER_TYPE = SERVER_TYPE.EXPRESS, force?: boolean): void {
        if (!this.app || force){
            this.app = Server[SERVER_METHOD[type]]();
            this.serverType = type;
        }else if (this.serverType !== type){
            throw Error('Server already initializated. Use \'force\' to recreate.');
        }
    }

    /**
     * Singleton method that return the unique server application instance.
     *
     * @static
     * @return {ServerApplication}
     */
    public static getInstance(): ServerApplication{
        if (!this.app){
            this.useServer(SERVER_TYPE.EXPRESS);
        }

        return this.app;
    }

}