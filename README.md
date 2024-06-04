# Basic Service

[![Latest Release](https://gitlab.com/experiments72/basic-service/-/badges/release.svg)](https://gitlab.com/experiments72/basic-service/-/releases)
[![coverage report](https://gitlab.com/experiments72/basic-service/badges/main/coverage.svg)](https://gitlab.com/experiments72/basic-service/-/commits/main)
[![Documentation coverage](https://gitlab.com/experiments72/basic-service/-/raw/main/docs/images/coverage-badge-documentation.svg)](https://experiments72.gitlab.io/-/basic-service/-/jobs/3731192935/artifacts/public/index.html)
[![semantic-release: 📦🚀](https://img.shields.io/badge/semantic--release-📦🚀-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-blue.svg)](https://conventionalcommits.org)

This is a basic service module to implement microservices.

## Installation / Requirements

Nodejs >= 18

`npm i @experiments72/basic-service`

## Usage

### Service bootstrap

Create `BasicService` object and execute `run` method:

```
import { BasicService } from '../../src';

const pingService = new BasicService({port: 3000});

pingService.run(() => {
    console.log('server listen on port 3000');
});
```

or use the decorator

```
@Service({port: 3000})
class PingService extends BasicService{

    protected run = (): void => {
        console.log('server listen on port 3000')
    }

}
```

### Create a controller

Create a class that implement `IController` interface:

```
class PingController implements IController{

    public readonly id: string = 'ping';
    public readonly handlers?: ControllerHandler[] = [{
        method: CONTROLLER_METHOD.GET,
        path: '/ping',
        handler: 'ping'
    }];

    public ping(): string{
        return 'pong';
    }
}
```

or use `Controller` and `API` decorators:

```
import { Controller, GET } from '../../src';

@Controller('ping')
export class PingController{

    @GET('/ping')
    public ping(): string{
        return 'pong';
    }

}
```

### Examples

#### Without Decorators

```
class PingService extends BasicService{

    protected run = (): void => {
        console.log('server listen on port 3000')
    }

}

class PingController implements IController{

    public readonly id: string = 'ping';
    public readonly handlers?: ControllerHandler[] = [{
        method: CONTROLLER_METHOD.GET,
        path: '/ping',
        handler: 'ping'
    }];

    public ping(): string{
        return 'pong';
    }

}

const pingService = new PingService({port: 3000}, new PingController());

pingService.listen();
```

#### With Decorators

```
@Service({port: 3000})
class PingService extends BasicService{

    protected run = (): void => {
        console.log('server listen on port 3000')
    }

}

@Controller('ping')
class PingController{

    @GET('/ping')
    public ping(): string{
        return 'pong';
    }

}
```

#### Mixed Usage

```
class PingService extends BasicService{

    protected run = (): void => {
        console.log('server listen on port 3000')
    }

}

const pingService = new PingService({port: 3000});

@Controller('ping', pingService)
class PingController implements IController{

    public readonly id: string = 'ping';
    public readonly handlers?: ControllerHandler[] = [{
        method: CONTROLLER_METHOD.GET,
        path: '/ping',
        handler: 'ping'
    }];

    @GET('/ping')
    public ping(): string{
        return 'pong';
    }

}

pingService.listen();
```

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `npm run lint`    perform the eslint linter