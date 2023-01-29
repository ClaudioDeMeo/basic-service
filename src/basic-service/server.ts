import { ServerApplication } from '../interfaces/server-application';
import { ExpressServer } from './servers/express-server';

export abstract class Server{

    private static readonly app: ServerApplication = new ExpressServer();

    public static getInstance(): ServerApplication{
        return this.app;
    }

}