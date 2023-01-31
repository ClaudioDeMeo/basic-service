import { Get as Getter, Route } from 'tsoa';
import { BasicService, Controller, GET } from '../../src';

@Route('ping')
@Controller('ping')
export class PingController{

    @Getter('/ping')
    @GET('/ping')
    public ping(): string{
        return 'pong';
    }

}

const pingService = new BasicService({port: 3000});

pingService.run(() => {
    console.log('server listen on port 3000');
});