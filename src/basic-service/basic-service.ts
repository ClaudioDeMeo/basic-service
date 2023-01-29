import { ServiceConfig } from '../interfaces';
import { ServerApplication } from '../interfaces/server-application';
import { Server } from './server';

export class BasicService{

    protected readonly server: ServerApplication;

    public constructor(private readonly serviceConfig?: ServiceConfig) {
        this.server = Server.getInstance();

        if (this.serviceConfig?.swagger){
            this.server.prepareSwagger(serviceConfig?.docsPath, serviceConfig?.swaggerLocation);
        }
    }

    public run(callback?: () => void): void {
        this.server.listen(this.serviceConfig?.port, callback);
    }

}