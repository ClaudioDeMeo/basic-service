import { ExpressServer } from '../../src/server/servers/express-server';
import { ServerFactory } from '../../src/server';

describe('basic-service', (): void => {
    describe('ServerFactory', (): void => {
        describe('.createServer()', (): void => {
            it('should create a server application of type ExpressServer', (): void => {
                const factory: ServerFactory = new ServerFactory();
                const app = factory.createServer()
                expect(app).not.toBeUndefined();
                expect(app).toBeInstanceOf(ExpressServer)
            });
        });
    });
});