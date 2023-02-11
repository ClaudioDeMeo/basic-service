import { API, BasicService, Controller, CONTROLLER_METHOD } from '../../src';
import { ServiceComposer } from '../../src/decorators/service-composer';


describe('decorators', (): void => {
    describe('@Controller', (): void => {

        beforeEach((): void => {
            (ServiceComposer as any).controllers = [];
            (ServiceComposer as any).service = undefined;
        });


        afterAll((): void => {
            (ServiceComposer as any).controllers = [];
            (ServiceComposer as any).service = undefined;
        });

        it('should add the controller into server', (): void => {

            @Controller()
            //@ts-ignore
            class Stub {

            }

            expect((ServiceComposer as any).controllers.length).toBe(1);
        });

        it('should add the controller into server with given name', (): void => {

            const controlName = 'test';

            @Controller(controlName)
            //@ts-ignore
            class Stub {

            }

            expect((ServiceComposer as any).controllers.length).toBe(1);
            expect((ServiceComposer as any).controllers[0].id).toBe(controlName);
        });

        it('should add the controller into the given server', (): void => {

            const testService = new BasicService();

            const attachControllersSpy = jest.spyOn(testService, 'attachControllers');

            const controlName = 'test';

            @Controller(controlName, testService)
            //@ts-ignore
            class Stub {

            }

            expect((testService as any).controllers).not.toBeUndefined();
            expect((testService as any).controllers.length).toBe(1);
        });

        it('should add the controller into server with given name and with handler', (): void => {

            const controlName = 'test';

            @Controller(controlName)
            //@ts-ignore
            class Test {

                @API({
                    method: CONTROLLER_METHOD.GET,
                    path: '/test'
                })
                //@ts-ignore
                public test = jest.fn();

            }

            expect((ServiceComposer as any).controllers.length).toBe(1);
            expect((ServiceComposer as any).controllers[0].id).toBe(controlName);
            expect((ServiceComposer as any).controllers[0].handlers).not.toBeUndefined();
            expect((ServiceComposer as any).controllers[0].handlers.length).toBe(1);
        });
    });
});