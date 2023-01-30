import { Server } from '../../src/basic-service/server';
import { ExpressServer } from '../../src/basic-service/servers/express-server';
import { ServerApplication } from '../../src/interfaces/server-application';

describe('basic-service', (): void => {
    describe('Server', (): void => {
        describe('.getInstance()', (): void => {
            it('should return an ExpressServer object', (): void => {
                const application: ServerApplication = Server.getInstance();

                expect(application).toBeInstanceOf(ExpressServer);
            });
        });
    });
});