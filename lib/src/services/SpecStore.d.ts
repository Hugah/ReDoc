import { OpenAPISpec } from '../types';
import { ApiInfoModel } from './models/ApiInfo';
import { SecuritySchemesModel } from './models/SecuritySchemes';
import { OpenAPIParser } from './OpenAPIParser';
import { RedocNormalizedOptions } from './RedocNormalizedOptions';
/**
 * Store that containts all the specification related information in the form of tree
 */
export declare class SpecStore {
    private options;
    parser: OpenAPIParser;
    constructor(spec: OpenAPISpec, specUrl: string | undefined, options: RedocNormalizedOptions);
    readonly info: ApiInfoModel;
    readonly externalDocs: import("../types/open-api").OpenAPIExternalDocumentation | undefined;
    readonly operationGroups: import("./MenuBuilder").ContentItemModel[];
    readonly securitySchemes: SecuritySchemesModel | undefined;
}
