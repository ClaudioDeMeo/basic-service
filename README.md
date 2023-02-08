# Basic Service

[![Latest Release](https://gitlab.com/experiments72/basic-service/-/badges/release.svg)](https://gitlab.com/experiments72/basic-service/-/releases)
[![coverage report](https://gitlab.com/experiments72/basic-service/badges/main/coverage.svg)](https://gitlab.com/experiments72/basic-service/-/commits/main)
[![Documentation coverage](https://gitlab.com/experiments72/basic-service/-/raw/main/docs/images/coverage-badge-documentation.svg)](https://experiments72.gitlab.io/-/basic-service/-/jobs/3731192935/artifacts/public/index.html)
[![semantic-release: 📦🚀](https://img.shields.io/badge/semantic--release-📦🚀-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-blue.svg)](https://conventionalcommits.org)
[![Node LTS](https://img.shields.io/badge/Node-%3E%3D%2018.x%20LTS-brightgreen.svg)](https://nodejs.org/dist/latest-v18.x/docs/api/)

This is a basic service module to implement microservices.

### Semantic Versioning & Commit Convention

This project follows [semantic versioning](https://semver.org/).
We release patch versions for critical bugfixes, minor versions for new features or non-essential changes, and major
versions for any breaking changes.

This project also follows the [conventional commit](https://www.conventionalcommits.org/en/v1.0.0/) convention with some
additional customization:

#### Patch version changes

- refactor(optional_scope) - indicates a code refactoring.
- chore(deps): indicates some dependency has been added / updated and therefore a new release is needed.
- no-release: indicates the commit shouldn't trigger a release no matter what.


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

### Create a controller

Create a class and use `Controller` and `API` decorators:

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

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `npm run lint`    perform the eslint linter