import { Server, SERVER_TYPE } from '../../src/basic-service/server';
import { ExpressServer } from '../../src/basic-service/servers/express-server';
import { ServerApplication } from '../../src/interfaces/server-application';

describe('basic-service', (): void => {
    describe('Server', (): void => {
        describe('.useServer() and .getInstance()', (): void => {

            beforeEach((): void => {
                (Server as any).app = undefined;
                (Server as any).serverType = undefined;
            });

            it('should return an ExpressServer object by default', (): void => {
                const application: ServerApplication = Server.getInstance();

                expect(application).toBeInstanceOf(ExpressServer);
            });

            it('should return an ExpressServer object after useServer is called with Express type', (): void => {
                Server.useServer(SERVER_TYPE.EXPRESS);
                const application: ServerApplication = Server.getInstance();

                expect(application).toBeInstanceOf(ExpressServer);
            });

            it('should not throw an exception if a server is already configured with the same server type', (): void => {
                Server.useServer(SERVER_TYPE.EXPRESS)

                expect(()=>Server.useServer(SERVER_TYPE.EXPRESS)).not.toThrow();
            });
        });
    });
});