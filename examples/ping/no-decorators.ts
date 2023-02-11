import { Get, Route } from 'tsoa';
import { BasicService, IController } from '../../src';
import { ControllerHandler, CONTROLLER_METHOD } from '../../src/basic-service/interfaces';

class PingService extends BasicService{

    protected run = (): void => {
        console.log('server listen on port 3000')
    }

}

@Route('ping-di')
class PingController implements IController{

    public readonly id: string = 'ping';
    public readonly handlers?: ControllerHandler[] = [{
        method: CONTROLLER_METHOD.GET,
        path: '/ping',
        handler: 'ping'
    }];

    @Get('/ping')
    public ping(): string{
        return 'pong';
    }

}

const pingService = new PingService({port: 3000}, new PingController());

pingService.listen();