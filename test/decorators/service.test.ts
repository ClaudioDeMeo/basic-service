import { Service } from '../../src';
import { Application } from '../../src/interfaces/application';

describe('decorators', (): void => {
    describe('@Service', (): void => {
        
        @Service
        class Stub {
            private readonly application: Application;
        }

        it('should initialize application property', (): void => {
            const stub = new Stub();
            const application = (stub as any).application;
            expect(application).not.toBeUndefined();
            expect(application.listen).not.toBeUndefined();
            expect(application.listen).toBeInstanceOf(Function);
        });
    });
});