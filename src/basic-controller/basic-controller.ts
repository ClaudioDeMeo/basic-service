import { Controller, ControllerHandler } from './interfaces';

export abstract class BasicController implements Controller {

    public readonly id: string;

    public readonly handlers: ControllerHandler[];

}