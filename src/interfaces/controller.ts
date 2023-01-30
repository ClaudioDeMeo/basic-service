export interface Controller {
    name: string;
    instance: any;
    handler?: ControllerHandler;
}

export enum CONTROLLER_METHOD {
    GET = 'get',
    POST = 'post',
    PUT = 'put',
    DELETE = 'delete'
}

export interface ControllerHandler {
    method: CONTROLLER_METHOD;
    path: string;
    handler: string;
}