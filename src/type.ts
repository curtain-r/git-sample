import fs from 'fs-extra';

export type Fs = typeof fs
// base
export type HttpFetch = (request: GitHttpRequest) => Promise<GitHttpResponse>;
export type HttpClient = {
    request: HttpFetch;
};
export type GitProgressEvent = {
    phase: string;
    loaded: number;
    total: number;
};
export type MessageCallback = (message: string) => void | Promise<void>;
export type ProgressCallback = (progress: GitProgressEvent) => void | Promise<void>;
export type GitHttpRequest = {
    /**
     * - The URL to request
     */
    url: string;
    /**
     * - The HTTP method to use
     */
    method?: string;
    /**
     * - Headers to include in the HTTP request
     */
    headers?: {
        [x: string]: string;
    };
    /**
     * - An HTTP or HTTPS agent that manages connections for the HTTP client (Node.js only)
     */
    agent?: any;
    /**
     * - An async iterator of Uint8Arrays that make up the body of POST requests
     */
    body?: any;
    /**
     * - Reserved for future use (emitting `GitProgressEvent`s)
     */
    onProgress?: ProgressCallback;
    /**
     * - Reserved for future use (canceling a request)
     */
    signal?: any;
};
export type GitHttpResponse = {
    /**
     * - The final URL that was fetched after any redirects
     */
    url: string;
    /**
     * - The HTTP method that was used
     */
    method?: string;
    /**
     * - HTTP response headers
     */
    headers?: {
        [x: string]: string;
    };
    /**
     * - An async iterator of Uint8Arrays that make up the body of the response
     */
    body?: any;
    /**
     * - The HTTP status code
     */
    statusCode: number;
    /**
     * - The HTTP status message
     */
    statusMessage: string;
};

// command
type CommonCommandOption = {
    fs: Fs,
    dir: string;
    gitdir?: string;
}
export type CommandOption<T> = T & CommonCommandOption;

export type InitOption = CommandOption<{
    bare?: boolean;
    defaultBranch?: string;
}>
export type CloneOption = CommandOption<{
    http: HttpClient;
    onProgress?: ProgressCallback;
    onMessage?: MessageCallback;
    // onAuth?: AuthCallback;
    // onAuthFailure?: AuthFailureCallback;
    // onAuthSuccess?: AuthSuccessCallback;
    url: string;
    corsProxy?: string;
    ref?: string;
    singleBranch?: boolean;
    noCheckout?: boolean;
    noTags?: boolean;
    remote?: string;
    depth?: number;
    since?: Date;
    exclude?: string[];
    relative?: boolean;
    headers?: {
        [x: string]: string;
    };
    cache?: any;
}>