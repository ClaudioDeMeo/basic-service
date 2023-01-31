import { Server } from '../../src/basic-service/server';
import { API, DELETE, GET, POST, PUT } from '../../src/decorators'
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

    describe('@GET', (): void => {

        afterAll((): void => {
            const app = Server.getInstance();
            app.close();
            (Server as any).app = undefined;
        });

        it('should add handler to the controller', (): void => {

            class Test {

                @GET('/test')
                //@ts-ignore
                public test = jest.fn();
            }

            const controller = new Test();

            expect((controller as any).handler?.length).toBe(1);
            expect((controller as any).handler[0].method).toBe(CONTROLLER_METHOD.GET);
        });
    });

    describe('@POST', (): void => {

        afterAll((): void => {
            const app = Server.getInstance();
            app.close();
            (Server as any).app = undefined;
        });

        it('should add handler to the controller', (): void => {

            class Test {

                @POST('/test')
                //@ts-ignore
                public test = jest.fn();
            }

            const controller = new Test();

            expect((controller as any).handler?.length).toBe(1);
            expect((controller as any).handler[0].method).toBe(CONTROLLER_METHOD.POST);
        });
    });

    describe('@PUT', (): void => {

        afterAll((): void => {
            const app = Server.getInstance();
            app.close();
            (Server as any).app = undefined;
        });

        it('should add handler to the controller', (): void => {

            class Test {

                @PUT('/test')
                //@ts-ignore
                public test = jest.fn();
            }

            const controller = new Test();

            expect((controller as any).handler?.length).toBe(1);
            expect((controller as any).handler[0].method).toBe(CONTROLLER_METHOD.PUT);
        });
    });

    describe('@DELETE', (): void => {

        afterAll((): void => {
            const app = Server.getInstance();
            app.close();
            (Server as any).app = undefined;
        });

        it('should add handler to the controller', (): void => {

            class Test {

                @DELETE('/test')
                //@ts-ignore
                public test = jest.fn();
            }

            const controller = new Test();

            expect((controller as any).handler?.length).toBe(1);
            expect((controller as any).handler[0].method).toBe(CONTROLLER_METHOD.DELETE);
        });
    });
});