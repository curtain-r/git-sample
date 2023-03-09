import { CloneOption } from "../type";
import { _init } from "./init";

export const _clone = async ({
    fs,
    dir,
    gitdir,
    remote,
    url,
    corsProxy,
}: CloneOption) => {
    try {
        // 1. clone 先init
        await _init({fs, dir, gitdir});
        // 2. 把remote信息添加进去
        // await _addRemote({fs, gitdir, dir, remote, url, force: false})

        if (corsProxy) {
            // TODO: 
        }

    } catch (error) {
        await fs
            .rmdir(gitdir, { recursive: true, maxRetries: 10 })
            .catch(() => undefined)
        throw error
    }
}