import { NodeHTTPRequest } from '@trpc/server/adapters/node-http';
export declare const getQuery: (req: NodeHTTPRequest, url: URL) => Record<string, string | string[]>;
export declare const getBody: (req: NodeHTTPRequest, maxBodySize?: number) => Promise<any>;
//# sourceMappingURL=input.d.ts.map