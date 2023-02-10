import { API, Controller, CONTROLLER_METHOD } from '../../src';
import { ServerSingleton } from '../../src/server';
import { ServerApplication } from '../../src/server/interfaces';


describe('decorators', (): void => {
    describe('@Controller', (): void => {

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

        it('should add the controller into server', (): void => {

            @Controller()
            //@ts-ignore
            class Stub {

            }

            const serverApplication: ServerApplication = (ServerSingleton as any).app;

            const routerControllerMap = (serverApplication as any).routerControllerMap;

            expect(routerControllerMap['Stub']).not.toBeUndefined();
            expect(routerControllerMap['Stub'].controller).not.toBeUndefined();
            expect(routerControllerMap['Stub'].router).not.toBeUndefined();
        });

        it('should add the controller into server with given name', (): void => {

            const controlName = 'test';

            @Controller(controlName)
            //@ts-ignore
            class Stub {

            }

            const serverApplication: ServerApplication = (ServerSingleton as any).app;

            const routerControllerMap = (serverApplication as any).routerControllerMap;

            expect(routerControllerMap[controlName]).not.toBeUndefined();
            expect(routerControllerMap[controlName].controller).not.toBeUndefined();
            expect(routerControllerMap[controlName].router).not.toBeUndefined();
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

            const serverApplication: ServerApplication = (ServerSingleton as any).app;

            const routerControllerMap = (serverApplication as any).routerControllerMap;

            expect(routerControllerMap[controlName]).not.toBeUndefined();
            expect(routerControllerMap[controlName].controller).not.toBeUndefined();
            expect(routerControllerMap[controlName].router).not.toBeUndefined();
            expect(routerControllerMap[controlName].controller.handlers.length).toBe(1);
        });
    });
});