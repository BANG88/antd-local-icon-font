export declare const formatUrl: (url: string) => string;
/**
 * download file
 * @param url res should be download
 * @param dest where should we put the downloaded file interface
 * @param cb when the download task is done or has en error occured
 */
export declare const downloader: (url: string, dest: string, cb: Function) => void;
/**
 * find file
 * @param input destination
 * @param cb
 */
export declare const finder: (input: string, cb: Function) => void;
export interface RunnerOptions {
    /**
     * base dir
     *
     * @type {string}
     * @memberOf RunnerOptions
     */
    baseDir?: string;
    /**
     * path to css folder
     *
     * @type {string}
     * @memberOf RunnerOptions
     */
    cssPath?: string;
    /**
     *
     *
     * @type {string}
     * @memberOf RunnerOptions
     */
    fontsSavedPath?: string;
    fontsPath?: string;
    /**
     * regexp for match fonts url
     * the default reg is: /((\w+:\/\/)[-a-zA-Z0-9:@;?&=\/%\+\.\*!'\(\),\$_\{\}\^~\[\]'#|]+)/g
     *
     * @type {string}
     * @memberOf RunnerOptions
     */
    urlReg?: string;
    fontReg?: string;
    iconUrl?: string;
}
declare const runner: ({fontsSavedPath, iconUrl, fontReg, urlReg, cssPath, fontsPath}: RunnerOptions) => void;
export default runner;
