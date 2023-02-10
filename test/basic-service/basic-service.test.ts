import { BasicController, BasicService } from '../../src';
import { Controller, ControllerHandler } from '../../src/basic-controller/interfaces';
import { ServerSingleton } from '../../src/server';
import { ServerApplication } from '../../src/server/interfaces';

describe('basic-service', (): void => {
    describe('BasicService', (): void => {

        let serverApplicationMock: ServerApplication;

        beforeAll(() => {
            serverApplicationMock = {
                listen: jest.fn(),
                close: jest.fn(),
                addMiddleware: jest.fn(),
                addController: jest.fn(),
                addSwagger: jest.fn(),
            };

            jest.spyOn(ServerSingleton, 'getInstance').mockReturnValue(serverApplicationMock);
        });


        describe('new BasicService()', (): void => {
            beforeEach(() => {
                (serverApplicationMock.addSwagger as jest.Mock).mockClear();
            });

            it('should call serverApplication\'s addSwagger by default or if swagger = true in the config', (): void => {
                new BasicService();
                new BasicService({swagger: true});

                expect(serverApplicationMock.addSwagger).toBeCalledTimes(2);
            });

            it('should not call serverApplication\'s addSwagger if swagger = false in the config', (): void => {
                new BasicService({swagger: false});

                expect(serverApplicationMock.addSwagger).not.toBeCalled();
            });

            it('should call serverApplication\'s addSwagger with the path and location given as parameters', (): void => {
                const path = '/test-path';
                const location = '/test-location';
                new BasicService({
                    swagger: true,
                    swaggerLocation: location,
                    docsPath: path
                });

                expect(serverApplicationMock.addSwagger).toBeCalledWith(path, location);
            });

            it('should add controllers to the server application if is declared when extends BasciService', (): void => {
                class Controller extends BasicController{
                    public id: string = 'test';
                    public handlers: ControllerHandler[];
                }

                const controller = new Controller();

                new BasicService(undefined, [controller]);
                expect(serverApplicationMock.addController).toBeCalledWith(controller);
            });
        });

        describe('.listen()', (): void => {

            beforeAll((): void => {
                const app = ServerSingleton.getInstance();
                app.close();
            });

            it('should call serverApplication\'s listen method with the port given in the constructor', (): void => {
                const port = 8080;
                const basicService: BasicService = new BasicService({port: port});
                basicService.listen();

                expect(serverApplicationMock.listen).toBeCalledWith(port, undefined);
            });

            it('should call serverApplication\'s listen method passing the run method defined in the Sub class', (): void => {
                const port = 8080;

                class Stub extends BasicService {
                    protected run = jest.fn();
                }
                const basicService: Stub = new Stub({port: port});
                basicService.listen();

                expect(serverApplicationMock.listen).toBeCalledWith(port, (Stub.prototype as any).run);
            });
        });
    });
});