import { createOpenApiNodeHttpHandler, } from './node-http/core.mjs';
export function fastifyTRPCOpenApiPlugin(fastify, opts, done) {
    let prefix = opts.basePath ?? '';
    // if prefix ends with a slash, remove it
    if (prefix.endsWith('/')) {
        prefix = prefix.slice(0, -1);
    }
    const openApiHttpHandler = createOpenApiNodeHttpHandler(opts);
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