import { ExpressServer } from '../../src/basic-service/servers/express-server';
import { ServerFactory } from '../../src/basic-service/server-factory';

describe('basic-service', (): void => {
    describe('ServerFactory', (): void => {
        describe('.createServer()', (): void => {
            it('should create a server application of type ExpressServer', (): void => {
                const app = ServerFactory.createServer()
                expect(app).not.toBeUndefined();
                expect(app).toBeInstanceOf(ExpressServer)
            });
        });
    });
});