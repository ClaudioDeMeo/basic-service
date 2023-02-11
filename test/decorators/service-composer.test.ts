import { BasicService, Controller } from '../../src';
import { ServerSingleton } from '../../src/server';
import { ServiceComposer } from '../../src/decorators/service-composer';
import { Controller as ControllerInterface, ControllerHandler } from '../../src/basic-service/interfaces';

describe('decorators', (): void => {
    describe('ServiceComposer', (): void => {

        beforeEach((): void => {
            const app = ServerSingleton.getInstance();
            app.close();
            (ServerSingleton as any).app = undefined;
            (ServiceComposer as any).controllers = [];
            (ServiceComposer as any).service = undefined;
        });

        afterAll((): void => {
            const app = ServerSingleton.getInstance();
            app.close();
            (ServerSingleton as any).app = undefined;
            (ServiceComposer as any).controllers = [];
            (ServiceComposer as any).service = undefined;
        });

        describe('.createService()', (): void => {

            it('shold create a server and start it', (): void => {
                const listenSpy = jest.spyOn(BasicService.prototype, 'listen');
                ServiceComposer.createService(new BasicService());
                expect((ServiceComposer as any).service).not.toBeUndefined();
                expect(listenSpy).toHaveBeenCalled();
            });

            it('shold create a server, start it and attach the loaded controllers', (): void => {
                @Controller('test')
                //@ts-ignore
                class TestController{

                }
                const attachControllersSpy = jest.spyOn(BasicService.prototype, 'attachControllers');
                ServiceComposer.createService(new BasicService());
                expect((ServiceComposer as any).controllers).not.toBeUndefined();
                expect((ServiceComposer as any).controllers.length).toBe(1);
                expect(attachControllersSpy).toHaveBeenCalled();
            });

        });
        describe('.addController()', (): void => {

            it('shold add a controller to the server', (): void => {
                class TestController implements ControllerInterface{
                    id: string = 'test';
                    handlers: ControllerHandler[]  = [];
                }

                ServiceComposer.createService(new BasicService());
                const controller = new TestController();
                ServiceComposer.addController(controller);
                const attachControllersSpy = jest.spyOn(BasicService.prototype, 'attachControllers');
                expect((ServiceComposer as any).controllers.length).toBe(1);
                expect(attachControllersSpy).toHaveBeenCalled();
            });

            it('shold add a controller also if the server isn\'t loaded', (): void => {
                class TestController implements ControllerInterface{
                    id: string = 'test';
                    handlers: ControllerHandler[]  = [];
                }

                const controller = new TestController();
                ServiceComposer.addController(controller);
                expect((ServiceComposer as any).controllers.length).toBe(1);
            });

        });
    });
});