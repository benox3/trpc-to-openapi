"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fastifyTRPCOpenApiPlugin = fastifyTRPCOpenApiPlugin;
const core_1 = require("./node-http/core");
function fastifyTRPCOpenApiPlugin(fastify, opts, done) {
    var _a;
    let prefix = (_a = opts.basePath) !== null && _a !== void 0 ? _a : '';
    // if prefix ends with a slash, remove it
    if (prefix.endsWith('/')) {
        prefix = prefix.slice(0, -1);
    }
    const openApiHttpHandler = (0, core_1.createOpenApiNodeHttpHandler)(opts);
    fastify.all(`${prefix}/*`, async (request, reply) => {
        const prefixRemovedFromUrl = request.url.replace(fastify.prefix, '').replace(prefix, '');
        const rawRequest = Object.assign(request.raw, {
            body: request.body,
            url: prefixRemovedFromUrl,
        });
        return await openApiHttpHandler(rawRequest, Object.assign(reply, {
            once: () => undefined,
            setHeader: (key, value) => {
                if (Array.isArray(value)) {
                    value.forEach((v) => reply.header(key, v));
                    return reply;
                }
                return reply.header(key, value);
            },
            end: (body) => reply.send(body),
        }));
    });
    done();
}
//# sourceMappingURL=fastify.js.map