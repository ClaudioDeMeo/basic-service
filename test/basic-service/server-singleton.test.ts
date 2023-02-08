import { ExpressServer } from '../../src/basic-service/servers/express-server';
import { ServerSingleton } from '../../src/basic-service/server-singleton';

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
});