# Nest.js Amplitude Module

A tiny package to make a bridge between [Nest.js](https://nestjs.com) DI system and [Amplitude](https://developers.amplitude.com/docs/nodejs) client instance.

![](https://img.shields.io/bundlephobia/minzip/nestjs-amplitude?style=social)

## Table of Contents

-   [Nest.js Amplitude Module](#nestjs-amplitude)
-   [Table of Contents](#table-of-contents)
-   [Installation](#installation)
-   [Usage](#usage)
-   [Contributing](#contributing)
-   [License](#license)

## Installation

You can install `nestjs-amplitude` using npm or yarn:

```bash
npm i nestjs-amplitude @amplitude/node --save
# or
yarn add nestjs-amplitude @amplitude/node
```

> The package also requires it's peer dependencies to be installed. Likely you already have `@nestjs/common` installed - that is the reason why it is not specified in the snippet above.

## Usage

You may register `AmplitudeModule` synchronously as follows.

```typescript
import { Module } from '@nestjs/common';
import { AmplitudeModule } from 'nestjs-amplitude';

@Module({
imports: [
    AmplitudeModule.register({
      apiKey: 'amplitude_api_key',
      debug: true,
    })
})
export class AppModule {}
```

`AmplitudeModule` may also be registered asynchronously with a factory or a value. Let's imagine we are using a `ConfigService` and want to get Amplitude options from it. We may do it as follows:

```typescript
import { Module } from '@nestjs/common';
import { AmplitudeModule } from 'nestjs-amplitude';
import { ConfigModule, ConfigService } from '<config_module>';

@Module({
imports: [
    AmplitudeModule.registerAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => configService.get('amplitude'),
    }),
})
export class AppModule {}
```

When registered, `AmplitudeService` may be injected into Nest.js injectables as usual:

```typescript
import { Injectable, Controller, Get } from "@nestjs/common";
import { AmplitudeService } from "nestjs-amplitude";

@Injectable()
@Controller()
export class SomeService {
    constructor(private readonly amplitudeService: AmplitudeService) {}

    @Get()
    async listAllOffers() {
        const offers = [];

        this.amplitudeService.logEvent({
            event_type: "Node.js Event",
            user_id: "datamonster@gmail.com",
            location_lat: 37.77,
            location_lng: -122.39,
            ip: "127.0.0.1",
            event_properties: {
                keyString: "valueString",
                keyInt: 11,
                keyBool: true,
            },
        });

        return offers;
    }
}
```

`AmplitudeService` instance exposes all Node.js Amplitude SDK Client methods as it's own. You may find SDK specification [here](https://developers.amplitude.com/docs/nodejs).

## Contributing

Feel free to send any suggestions in [GitHub issues](https://github.com/yakovlev-alexey/nestjs-amplitude/issues) or open a Pull Request with your feature.

## License

[MIT](/LICENSE)
