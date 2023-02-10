import { ExpressServer } from '../../src/server/servers/express-server';
import { ServerSingleton } from '../../src/server';
import { ServerFactory } from '../../src/server';

describe('basic-service', (): void => {
    describe('ServerSingleton', (): void => {
        describe('.getInstance()', (): void => {

            beforeEach((): void => {
                (ServerSingleton as any).app = undefined;
            });

            afterAll((): void => {
                (ServerSingleton as any).app = undefined;
            });

            it('should create a singleton instance of ExpressServer server application', (): void => {
                const app = ServerSingleton.getInstance();
                expect(app).not.toBeUndefined();
                expect(app).toBeInstanceOf(ExpressServer)
                const app2 = ServerSingleton.getInstance();
                expect(app2).toBe(app);
            });
        });
    });

    describe('useFactory', (): void => {
        beforeEach((): void => {
            (ServerSingleton as any).app = undefined;
        });

        afterAll((): void => {
            (ServerSingleton as any).app = undefined;
            (ServerSingleton as any).factory = undefined;
        });

        it('should set the provided server factory to build the server application', (): void => {
            class Stub extends ServerFactory{}

            ServerSingleton.useFactory<Stub>(new Stub());

            expect((ServerSingleton as any).factory).toBeInstanceOf(Stub);
        });
    });
});