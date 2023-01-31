export interface Controller {
    name: string;
    instance: any;
    handler?: ControllerHandler[];
}

/**
 * Contains the available verbs for the service.
 * @enum {string}
 */
export enum CONTROLLER_METHOD {
    /** @value get */
    GET = 'get',
    /** @value post */
    POST = 'post',
    /** @value put */
    PUT = 'put',
    /** @value delete */
    DELETE = 'delete'
}

export interface ControllerHandler {
    method: CONTROLLER_METHOD;
    path: string;
    handler: string;
}