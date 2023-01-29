import { Get, Route } from 'tsoa';
import { Controller } from '../interfaces/controller';

interface PingResponse {
    message: string;
}

@Route('ping')
export default class PingController {

    @Get('/')
    public async ['getMessage'](): Promise<PingResponse> {
        return {
            message: 'pong',
        };
    }

}