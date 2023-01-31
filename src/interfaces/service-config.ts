/**
 * Rappresents the basic service configuration.
 * @property {string | number} [port]
 * @property {string} [docsPath]
 * @property {string} [swaggerLocation]
 * @property {boolean} [swagger]
 */
export interface ServiceConfig {

    /**
     * The listening port of the web server. if not specified the port is chosen randomically.
     */
    port?: string | number;

    /**
     * The path of the swagger api.
     */
    docsPath?: string;

    /**
     * The directory location of the swagger.
     */
    swaggerLocation?: string;

    /**
     * Allow to enable/disable the swagger api. Default: true.
     */
    swagger?: boolean;

}