import { Get as Getter, Route } from 'tsoa';
import { BasicService, IController, ControllerHandler, CONTROLLER_METHOD, Controller, GET} from '../../src';

class PingService extends BasicService{

    protected run = (): void => {
        console.log('server listen on port 3000')
    }

}

const pingService = new PingService({port: 3000});

@Route('ping-mixed')
@Controller('ping', pingService)
class PingController implements IController{

    public readonly id: string = 'ping';
    public readonly handlers?: ControllerHandler[] = [{
        method: CONTROLLER_METHOD.GET,
        path: '/ping',
        handler: 'ping'
    }];

    @Getter('/ping')
    @GET('/ping')
    public ping(): string{
        return 'pong';
    }

}

pingService.listen();