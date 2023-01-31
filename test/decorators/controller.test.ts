import { Server } from '../../src/basic-service/server';
import { Controller } from '../../src/decorators'
import { ServerApplication } from '../../src/interfaces/server-application';

describe('decorators', (): void => {
    describe('@Controller', (): void => {
        it('should add the controller into server', (): void => {

            @Controller()
            //@ts-ignore
            class Stub {

            }

            const serverApplication: ServerApplication = (Server as any).app;

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

            const serverApplication: ServerApplication = (Server as any).app;

            const routerControllerMap = (serverApplication as any).routerControllerMap;

            expect(routerControllerMap[controlName]).not.toBeUndefined();
            expect(routerControllerMap[controlName].controller).not.toBeUndefined();
            expect(routerControllerMap[controlName].router).not.toBeUndefined();
        });
    });
});