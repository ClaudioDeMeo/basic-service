import { Server } from '../../src/basic-service/server';
import { API } from '../../src/decorators'
import { CONTROLLER_METHOD } from '../../src/interfaces';

describe('decorators', (): void => {
    describe('@API', (): void => {

        afterAll((): void => {
            const app = Server.getInstance();
            app.close();
            (Server as any).app = undefined;
        });

        it('should add handler to the controller', (): void => {

            class Test {

                @API({
                    method: CONTROLLER_METHOD.GET,
                    path: '/test'
                })
                //@ts-ignore
                public test = jest.fn();

                @API({
                    method: CONTROLLER_METHOD.GET,
                    path: '/test2'
                })
                //@ts-ignore
                public test2 = jest.fn();
            }

            const controller = new Test();

            expect((controller as any).handler?.length).toBe(2);
        });
    });
});