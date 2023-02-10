import { BasicService, Service } from '../../src';
import { ServerSingleton } from '../../src/server';
import { ServiceConfig } from '../../src/basic-service/interfaces';

describe('decorators', (): void => {
    describe('@Service', (): void => {

        beforeEach((): void => {
            const app = ServerSingleton.getInstance();
            app.close();
            (ServerSingleton as any).app = undefined;
        });

        afterAll((): void => {
            const app = ServerSingleton.getInstance();
            app.close();
            (ServerSingleton as any).app = undefined;
        });

        it('should initialize the BasicService with the given config', (): void => {

            const app = ServerSingleton.getInstance();

            const config: ServiceConfig = {
                port: '3001',
                docsPath: '/test',
                swaggerLocation: 'test',
                swagger: true
            }

            const run = jest.fn();
            const serviceListenSpy = jest.spyOn(BasicService.prototype, 'listen');
            const appListenSpy = jest.spyOn(app, 'listen');

            @Service(config)
            //@ts-ignore
            class Stub extends BasicService{
                protected run = run;
            }

            expect(serviceListenSpy).toHaveBeenCalled();
            expect(appListenSpy).toBeCalledWith('3001', run);
        });
    });
});