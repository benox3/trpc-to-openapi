import { TRPCError } from '@trpc/server';
import { getRequestInfo } from '@trpc/server/unstable-core-do-not-import';
import { normalizePath } from '../utils/path.mjs';
import { createOpenApiNodeHttpHandler } from './node-http/core.mjs';
const getUrlEncodedBody = async (req) => {
    const params = new URLSearchParams(await req.text());
    const data = {};
    for (const key of params.keys()) {
        data[key] = params.getAll(key);
    }
    return data;
};
// co-body does not parse Request body correctly
const getRequestBody = async (req) => {
    try {
        if (req.headers.get('content-type')?.includes('application/json')) {
            return {
                isValid: true,
                // use JSON.parse instead of req.json() because req.json() does not throw on invalid JSON
                data: JSON.parse(await req.text()),
            };
        }
        if (req.headers.get('content-type')?.includes('application/x-www-form-urlencoded')) {
            return {
                isValid: true,
                data: await getUrlEncodedBody(req),
            };
        }
        return {
            isValid: true,
            data: req.body,
        };
    }
    catch (err) {
        return {
            isValid: false,
            cause: err,
        };
    }
};
const createRequestProxy = async (req, url) => {
    const body = await getRequestBody(req);
    return new Proxy(req, {
        get: (target, prop) => {
            if (prop === 'url') {
                return url ? url : target.url;
            }
            if (prop === 'body') {
                if (!body.isValid) {
                    throw new TRPCError({
                        code: 'PARSE_ERROR',
                        message: 'Failed to parse request body',
                        cause: body.cause,
                    });
                }
                return body.data;
            }
            return target[prop];
        },
    });
};
export const createOpenApiFetchHandler = async (opts) => {
    const resHeaders = new Headers();
    const url = new URL(opts.req.url.replace(opts.endpoint, ''));
    const req = await createRequestProxy(opts.req, url.toString());
    const createContext = () => {
        if (opts.createContext) {
            return (opts.createContext({
                req: opts.req,
                resHeaders,
                info: getRequestInfo({
                    req: req,
                    path: decodeURIComponent(normalizePath(url.pathname)),
                    router: opts.router,
                    searchParams: url.searchParams,
                    headers: req.headers,
                }),
            }) ?? {});
        }
        return () => ({});
    };
    const openApiHttpHandler = createOpenApiNodeHttpHandler({
        router: opts.router,
        createContext,
        // @ts-expect-error FIXME
        onError: opts.onError,
        // @ts-expect-error FIXME
        responseMeta: opts.responseMeta,
    }); // as CreateOpenApiNodeHttpHandlerOptions<TRouter, any, any>);
    return new Promise((resolve) => {
        let statusCode;
        return openApiHttpHandler(req, {
            setHeader: (key, value) => {
                if (typeof value === 'string') {
                    resHeaders.set(key, value);
                }
                else {
                    for (const v of value) {
                        resHeaders.append(key, v);
                    }
                }
            },
            get statusCode() {
                return statusCode;
            },
            set statusCode(code) {
                statusCode = code;
            },
            end: (body) => {
                resolve(new Response(body, {
                    headers: resHeaders,
                    status: statusCode,
                }));
            },
        });
    });
};
//# sourceMappingURL=fetch.js.map