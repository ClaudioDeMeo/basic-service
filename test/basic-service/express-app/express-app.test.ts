import { ExpressApp } from '../../../src/basic-service/express-app/express-app';

describe('basic-service', () => {
    describe('express-app', (): void => {
        describe('ExpressApp', (): void => {
            
            const expressApp: ExpressApp = new ExpressApp();
    
            it('should have express Applicaiton as app property', (): void => {
                const expressApp: ExpressApp = new ExpressApp();
                const application = (expressApp as any).app;
                expect(application).not.toBeUndefined();
            });
    
            describe('.listen()', (): void => {
                it('should call express listen method', (): void => {
                    const listenSpy = jest.spyOn((expressApp as any).app, 'listen');
                    listenSpy.mockImplementation(()=> {});
                    expressApp.listen();
                    expect(listenSpy).toBeCalled();
                });
            })
        });
    });
});