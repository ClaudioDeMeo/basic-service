import { BasicService } from '../../src';
import { Server } from '../../src/basic-service/server';
import { ServerApplication } from '../../src/interfaces/server-application';

describe('basic-service', (): void => {
    describe('BasicService', (): void => {

        let serverApplicationMock: ServerApplication;

        beforeAll(() => {
            serverApplicationMock = {
                listen: jest.fn(),
                close: jest.fn(),
                addMiddleware: jest.fn(),
                addController: jest.fn(),
                addControllerHandlers: jest.fn(),
                prepareSwagger: jest.fn(),
            };

            jest.spyOn(Server, 'getInstance').mockReturnValue(serverApplicationMock);
        });


        describe('new BasicService()', (): void => {
            beforeEach(() => {
                (serverApplicationMock.prepareSwagger as jest.Mock).mockClear();
            });

            it('should call serverApplication\'s prepareSwagger by default or if swagger = true in the config', (): void => {
                new BasicService();
                new BasicService({swagger: true});

                expect(serverApplicationMock.prepareSwagger).toBeCalledTimes(2);
            });

            it('should not call serverApplication\'s prepareSwagger if swagger = false in the config', (): void => {
                new BasicService({swagger: false});

                expect(serverApplicationMock.prepareSwagger).not.toBeCalled();
            });

            it('should call serverApplication\'s prepareSwagger with the path and location given as parameters', (): void => {
                const path = '/test-path';
                const location = '/test-location';
                new BasicService({
                    swagger: true,
                    swaggerLocation: location,
                    docsPath: path
                });

                expect(serverApplicationMock.prepareSwagger).toBeCalledWith(path, location);
            });
        });

        describe('.run()', (): void => {

            it('should call serverApplication\'s listen method with the port given in the constructor', (): void => {
                const port = 8080;
                const basicService: BasicService = new BasicService({port: port});
                basicService.run();

                expect(serverApplicationMock.listen).toBeCalledWith(port, undefined);
            });

            it('should call serverApplication\'s listen method passing the callback ', (): void => {
                const port = 8080;
                const basicService: BasicService = new BasicService({port: port});
                const callback = jest.fn();
                basicService.run(callback);

                expect(serverApplicationMock.listen).toBeCalledWith(port, callback);
            });
        });
    });
});