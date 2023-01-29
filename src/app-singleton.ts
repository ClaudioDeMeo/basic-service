import { ExpressApp } from './basic-service/express-app/express-app';
import { ServerApplication } from './interfaces/server-application';

export abstract class AppSingleton{

    private static readonly app: ServerApplication = new ExpressApp();

    public static getInstance(): ServerApplication{
        return this.app;
    }

}