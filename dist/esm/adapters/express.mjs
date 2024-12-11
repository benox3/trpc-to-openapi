import { createOpenApiNodeHttpHandler, } from './node-http/core.mjs';
export const createOpenApiExpressMiddleware = (opts) => {
    const openApiHttpHandler = createOpenApiNodeHttpHandler(opts);
    return async (req, res) => {
        await openApiHttpHandler(req, res);
    };
};
//# sourceMappingURL=express.js.map