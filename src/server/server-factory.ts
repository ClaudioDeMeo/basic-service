import { ServerApplication } from './interfaces';
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
 * Static factory class to create a server application.
 */
export class ServerFactory {

    private createExpressServer(): ServerApplication {
        return new ExpressServer();
    }

    /**
     * Facotry method that allow to select application the server type.
     *
     * @static
     * @param {SERVER_TYPE} [type=SERVER_TYPE.EXPRESS]
     * @return {ServerApplication}
     */
    public createServer(type: SERVER_TYPE = SERVER_TYPE.EXPRESS): ServerApplication {
        return this[SERVER_METHOD[type || SERVER_TYPE.EXPRESS]]();
    }

}