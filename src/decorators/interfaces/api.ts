import { CONTROLLER_METHOD } from '../../basic-controller/interfaces';

/**
 * Rappresents the @API decorator's configuration object.
 * @property {CONTROLLER_METHOD} method
 * @property {string} path
 */
export interface ApiConfig {
    /**
     * The verb of the API.
     */
    method: CONTROLLER_METHOD;

    /**
     * The path of the API
     */
    path: string;
}