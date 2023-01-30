import { ServerApplication } from '../interfaces/server-application';
import { ExpressServer } from './servers/express-server';

export enum SERVER_TYPE {
    EXPRESS = 'EXPRESS'
}

enum SERVER_METHOD {
    EXPRESS = 'createExpressServer'
}

export abstract class Server{

    private static serverType: SERVER_TYPE;

    private static app: ServerApplication;

    private static createExpressServer(): ExpressServer {
        return new ExpressServer();
    }

    public static useServer(type: SERVER_TYPE = SERVER_TYPE.EXPRESS, force?: boolean): void {
        if (!this.app || force){
            this.app = Server[SERVER_METHOD[type]]();
            this.serverType = type;
        }else if (this.serverType !== type){
            throw Error('Server already initializated. Use \'force\' to recreate.');
        }
    }

    public static getInstance(): ServerApplication{
        if (!this.app){
            this.useServer(SERVER_TYPE.EXPRESS);
        }

        return this.app;
    }

}