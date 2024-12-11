"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenApiBuilder = exports.errorResponseFromMessage = exports.errorResponseFromStatusCode = exports.errorResponseObject = exports.generateOpenApiDocument = exports.fastifyTRPCOpenApiPlugin = exports.createOpenApiNuxtHandler = exports.createOpenApiNextHandler = exports.createOpenApiHttpHandler = exports.createOpenApiFetchHandler = exports.createOpenApiExpressMiddleware = void 0;
const oas31_1 = require("openapi3-ts/oas31");
Object.defineProperty(exports, "OpenApiBuilder", { enumerable: true, get: function () { return oas31_1.OpenApiBuilder; } });
const adapters_1 = require("./adapters");
Object.defineProperty(exports, "createOpenApiExpressMiddleware", { enumerable: true, get: function () { return adapters_1.createOpenApiExpressMiddleware; } });
Object.defineProperty(exports, "createOpenApiFetchHandler", { enumerable: true, get: function () { return adapters_1.createOpenApiFetchHandler; } });
Object.defineProperty(exports, "createOpenApiHttpHandler", { enumerable: true, get: function () { return adapters_1.createOpenApiHttpHandler; } });
Object.defineProperty(exports, "createOpenApiNextHandler", { enumerable: true, get: function () { return adapters_1.createOpenApiNextHandler; } });
Object.defineProperty(exports, "createOpenApiNuxtHandler", { enumerable: true, get: function () { return adapters_1.createOpenApiNuxtHandler; } });
Object.defineProperty(exports, "fastifyTRPCOpenApiPlugin", { enumerable: true, get: function () { return adapters_1.fastifyTRPCOpenApiPlugin; } });
const generator_1 = require("./generator");
Object.defineProperty(exports, "generateOpenApiDocument", { enumerable: true, get: function () { return generator_1.generateOpenApiDocument; } });
const schema_1 = require("./generator/schema");
Object.defineProperty(exports, "errorResponseFromMessage", { enumerable: true, get: function () { return schema_1.errorResponseFromMessage; } });
Object.defineProperty(exports, "errorResponseFromStatusCode", { enumerable: true, get: function () { return schema_1.errorResponseFromStatusCode; } });
Object.defineProperty(exports, "errorResponseObject", { enumerable: true, get: function () { return schema_1.errorResponseObject; } });
//# sourceMappingURL=index.js.map