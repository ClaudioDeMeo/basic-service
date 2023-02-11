import request from 'supertest';
import { IController, ControllerHandler, CONTROLLER_METHOD } from '../../../src';
import { ServerApplication } from '../../../src/server/interfaces';
import { ExpressServer } from '../../../src/server/servers/express-server';

describe('basic-service', (): void => {
    describe('servers', (): void => {
        describe('ExpressServer', (): void => {

            describe('new ExpressServer()', (): void => {
                it('should create new express applicaiton', (): void =>{
                    const expressServer = new ExpressServer();

                    expect((expressServer as any).app).not.toBeUndefined();
                    expect((expressServer as any).app).toHaveProperty('listen');
                });
            });

            describe('.listen()', (): void => {

                let expressServer: ServerApplication;
                const testResponse = 'TEST';
                const testPath = '/test';

                beforeEach((): void => {
                    expressServer = new ExpressServer();
                    const app = (expressServer as any).app;

                    app.get(testPath, (_req: any, res: any) => {
                        res.send(testResponse);
                    });
                });

                afterEach((): void => {
                    expressServer.close();
                });

                it('should call express listen', async (): Promise<void> => {
                    expressServer.listen(3000);

                    const app = (expressServer as any).app;
                    const res = await request(app).get(testPath);

                    expect(res.text).toBe('TEST');
                });

                it('should execute the callback after listen', async (): Promise<void> => {
                    const callback = jest.fn();
                    expressServer.listen(3000, callback);

                    const app = (expressServer as any).app;
                    const res = await request(app).get(testPath);

                    expect(res.text).toBe('TEST');
                    expect(callback).toBeCalled();
                });
            });

            describe('.close()', (): void => {

                let expressServer: ServerApplication;
                beforeAll((): void => {
                    expressServer = new ExpressServer();
                    expressServer.listen(3000);
                });

                it('should close the server', async (): Promise<void> => {
                    expressServer.close();

                    const app = (expressServer as any).app;
                    const res = await request(app).get("/");

                    expect(res.statusCode).toBe(404);
                });
            });

            describe('.addMiddleware()', (): void => {

                let expressServer: ServerApplication;
                beforeAll((): void => {
                    expressServer = new ExpressServer();
                    expressServer.listen(3000);
                });

                afterAll((): void => {
                    expressServer.close();
                });

                it('should add a new middleware', async(): Promise<void> => {
                    let middlewareCalled = false;
                    const middleware = (_req: unknown, _res: unknown, next: any) => {
                        middlewareCalled = true;
                        next();
                    };
                    expressServer.addMiddleware(middleware);

                    const app = (expressServer as any).app;
                    await request(app).get("/");
                    expect(middlewareCalled).toBe(true);
                });
            });

            describe('.addSwagger()', (): void => {

                let expressServer: ServerApplication;
                beforeAll((): void => {
                    expressServer = new ExpressServer();
                    expressServer.listen(3000);
                });

                afterAll((): void => {
                    expressServer.close();
                });

                it('shuld add a swagger', async (): Promise<void> =>{
                    expressServer.addSwagger();

                    const app = (expressServer as any).app;
                    const res = await request(app).get('/docs/');

                    expect(res.statusCode).toBe(200);
                });

                it('shuld add a swagger with custom path and location', async (): Promise<void> =>{
                    const path = '/test/';
                    const location = 'test'
                    expressServer.addSwagger(path, location);

                    const app = (expressServer as any).app;
                    const res = await request(app).get(path);

                    expect(res.statusCode).toBe(200);
                });
            });

            describe('.addController()', (): void => {

                let expressServer: ServerApplication;

                beforeAll((): void => {
                    expressServer = new ExpressServer();
                    expressServer.listen(3000);
                });

                afterAll((): void => {
                    expressServer.close();
                });

                it('should add an express router and a route automatically', async(): Promise<void> =>{
                    const path = '/testcontrollerwithhandler';
                    const controllerResult = 'TEST';
                    class TestController implements IController {

                        public id: string = 'test';

                        public handlers: ControllerHandler[] = [{
                            method: CONTROLLER_METHOD.GET,
                            path: path,
                            handler: 'get'
                        }];

                        public get() {
                            return controllerResult;
                        }
                    }
                    const testController = new TestController();

                    expressServer.addController(testController);

                    const app = (expressServer as any).app;
                    const res = await request(app).get(path);
                    expect(res.text).toBe(controllerResult);
                });
            });
        });
    });
});