import { BasicService } from '../../src';
import { Application } from '../../src/interfaces/application';

describe('basic-service', (): void => {
    describe('BasicService usage', (): void => {

        
        class Stub extends BasicService{

        }

        const applicationMock: Application = {
            listen: jest.fn()
        };
        const listenSpy = jest.spyOn(applicationMock, 'listen');

        beforeAll(() => {
            (Stub.prototype as any).application = applicationMock;
        });

        describe('constructor', (): void => {

            it('should have application property initialized from the decorator', (): void => {
                const stub: BasicService = new Stub();
                const application = (stub as any).application;
                expect(application).not.toBeUndefined();
            });
        });

        describe('.run()', (): void => {

            it('should call application\'s listen method', (): void => {
                const stub: BasicService = new Stub();
                stub.run();
                expect(listenSpy).toBeCalled();
            });

            it('should call application\'s listen method passing the port', (): void => {
                const port = 8080;
                const stub: BasicService = new Stub(port);
                stub.run();
                expect(listenSpy).toBeCalledWith(port, undefined);
            });

            it('should call application\'s listen method passing the callback', (): void => {
                const callback = jest.fn();
                const stub: BasicService = new Stub();
                stub.run(callback);
                expect(listenSpy).toBeCalledWith(undefined, callback);
            });

            it('should call application\'s listen method passing the port and the callback', (): void => {
                const port = 8080;
                const callback = jest.fn();
                const stub: BasicService = new Stub(port);
                stub.run(callback);
                expect(listenSpy).toBeCalledWith(port, callback);
            });
        });
    });
});