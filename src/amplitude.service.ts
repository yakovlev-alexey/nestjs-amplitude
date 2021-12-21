import { Inject } from "@nestjs/common";
import { NodeClient } from "@amplitude/node";

import { AMPLITUDE_OPTIONS } from "./constants";
import type { AmplitudeServiceOptions } from "./types";

export class AmplitudeService<
    T extends AmplitudeServiceOptions = AmplitudeServiceOptions,
> extends NodeClient {
    constructor(@Inject(AMPLITUDE_OPTIONS) protected readonly options: T) {
        super(options.apiKey, options);
    }
}
