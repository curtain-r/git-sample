import { join } from "path";
import { _clone } from "../command/clone";
import { CloneOption } from "../type";

export const clone = async ({
    fs,
    cache,
    http,
    onProgress,
    onMessage,
    // onAuth,
    // onAuthSuccess,
    // onAuthFailure,
    dir,
    gitdir=join(dir, '.git'),
    url,
    corsProxy,
    ref,
    remote,
    depth,
    since,
    exclude,
    relative,
    singleBranch,
    noCheckout,
    noTags,
    headers,
}: CloneOption) => {
    try {
        return await _clone({
        fs,
        cache,
        http,
        onProgress,
        onMessage,
        // onAuth,
        // onAuthSuccess,
        // onAuthFailure,
        dir,
        gitdir,
        url,
        corsProxy,
        ref,
        remote,
        depth,
        since,
        exclude,
        relative,
        singleBranch,
        noCheckout,
        noTags,
        headers,
        })
    } catch (error) {
        throw error;
    }
}