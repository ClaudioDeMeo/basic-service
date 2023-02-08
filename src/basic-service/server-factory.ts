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
 * Abstract static factory class to create a server application.
 *
 * @abstract
 */
export abstract class ServerFactory {

    private static createExpressServer(): ServerApplication {
        return new ExpressServer();
    }

    /**
     * Facotry method that allow to select application the server type.
     *
     * @static
     * @param {SERVER_TYPE} [type=SERVER_TYPE.EXPRESS]
     * @return {ServerApplication}
     */
    public static createServer(type: SERVER_TYPE = SERVER_TYPE.EXPRESS): ServerApplication {
        return this[SERVER_METHOD[type]]();
    }

}