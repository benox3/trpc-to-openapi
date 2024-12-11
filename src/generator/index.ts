import { ZodOpenApiObject, ZodOpenApiPathsObject, createDocument } from 'zod-openapi';

import {
  OpenApiRouter,
  type OpenAPIObject,
  type SecurityRequirementObject,
  type SecuritySchemeObject,
  type TagObject,
} from '../types';
import { getOpenApiPathsObject, mergePaths } from './paths';

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

export const generateOpenApiDocument = (
  appRouter: OpenApiRouter,
  opts: GenerateOpenApiDocumentOptions,
): OpenAPIObject => {
  const securitySchemes = opts.securitySchemes ?? {
    Authorization: {
      type: 'http',
      scheme: 'bearer',
    },
  };
  return createDocument({
    openapi: opts.openApiVersion ?? '3.0.3',
    info: {
      title: opts.title,
      description: opts.description,
      version: opts.version,
    },
    servers: [
      {
        url: opts.baseUrl,
      },
    ],
    paths: mergePaths(getOpenApiPathsObject(appRouter, Object.keys(securitySchemes)), opts.paths),
    components: {
      securitySchemes,
    },
    security: opts.security,
    tags: opts.tags?.map((tag) => (typeof tag === 'string' ? { name: tag } : tag)),
    externalDocs: opts.docsUrl ? { url: opts.docsUrl } : undefined,
  });
};
