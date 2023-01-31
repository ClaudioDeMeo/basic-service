import { Service } from '../../src/decorators';
import { ServiceConfig } from '../../src/interfaces';
import { BasicService } from '../../src'
import { Server } from '../../src/basic-service/server';

describe('decorators', (): void => {
    describe('@Service', (): void => {

        beforeEach((): void => {
            const app = Server.getInstance();
            app.close();
            (Server as any).app = undefined;
        });

        afterAll((): void => {
            const app = Server.getInstance();
            app.close();
            (Server as any).app = undefined;
        });

        it('should initialize the BasicService with the given config', (): void => {

            const config: ServiceConfig = {
                port: '3001',
                docsPath: '/test',
                swaggerLocation: 'test',
                swagger: true
            }

            @Service(config)
            //@ts-ignore
            class Stub extends BasicService{

            }

            const stub = new Stub();

            const serviceConfig: ServiceConfig = (stub as any).serviceConfig;
            expect(serviceConfig).not.toBeUndefined();
        });

        it('should initialize the BasicService with the given config', (): void => {

            const config: ServiceConfig = {
                port: '3000',
                docsPath: '/test',
                swaggerLocation: 'test',
                swagger: true
            };

            const run = jest.spyOn(BasicService.prototype, 'run');

            const runCallback = jest.fn();

            @Service(config, runCallback)
            //@ts-ignore
            class Stub extends BasicService{

            }

            expect(run).toBeCalledWith(runCallback);
        });
    });
});