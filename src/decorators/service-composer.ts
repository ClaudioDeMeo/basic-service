import { BasicService } from '../basic-service';
import { Controller } from '../basic-service/interfaces';

/**
 * Abstract service builder class used in decorators.
 *
 * @export
 * @abstract
 */
export abstract class ServiceComposer {

    private static readonly controllers: Controller[] = [];
    private static service: BasicService;

    /**
     * Create and start the service with controllers configured by decorator
     *
     * @static
     * @param {BasicService} service
     */
    public static createService(service: BasicService): void {
        if (!this.service){
            this.service = service;
            if (this.controllers?.length > 0){
                this.service.attachControllers(this.controllers);
            }

            this.service.listen();
        }
    }

    /**
     * Attach a controller to the service
     *
     * @static
     * @param {Controller} controller
     */
    public static addController(controller: Controller): void{
        this.controllers.push(controller);
        this.service?.attachControllers(controller);
    }

}