import { Get as Getter, Route } from 'tsoa';
import { BasicService, GET, Service } from '../../src';
import { Controller } from '../../src';

@Service({port: 3000})
class PingService extends BasicService{

    protected run = (): void => {
        console.log('server listen on port 3000')
    }

}

@Route('ping-decorator')
@Controller('ping')
class PingController{

    @Getter('/ping')
    @GET('/ping')
    public ping(): string{
        return 'pong';
    }

}