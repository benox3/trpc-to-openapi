import { ZodOpenApiObject, ZodOpenApiPathsObject } from 'zod-openapi';
import { OpenApiRouter, type OpenAPIObject, type SecurityRequirementObject, type SecuritySchemeObject, type TagObject } from '../types';
export interface GenerateOpenApiDocumentOptions {
    title: string;
    description?: string;
    version: string;
    openApiVersion?: ZodOpenApiObject['openapi'];
    baseUrl: string;
    docsUrl?: string;
    tags?: string[] | TagObject[];
    securitySchemes?: Record<string, SecuritySchemeObject>;
    security?: SecurityRequirementObject[];
    paths?: ZodOpenApiPathsObject;
}
export declare const generateOpenApiDocument: (appRouter: OpenApiRouter, opts: GenerateOpenApiDocumentOptions) => OpenAPIObject;
//# sourceMappingURL=index.d.ts.map