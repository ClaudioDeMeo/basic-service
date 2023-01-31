import { BasicService, Controller, GET } from '../../src';

@Controller('ping')
export class PingController{

    @GET('/ping')
    public ping(): string{
        return 'pong';
    }

}

const pingService = new BasicService({port: 3000});

pingService.run(() => {
    console.log('server listen on port 3000');
});