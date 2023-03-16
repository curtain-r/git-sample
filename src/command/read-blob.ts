import { ReadBlobOption } from '../type';
import { resolveBlob } from '../util/resolve-blob';

export const readBlob = async ({fs, cache, gitdir, oid, filepath = undefined}: ReadBlobOption) => {
    if (filepath !== undefined) {
        // oid = await resolveFilepath({ fs, cache, gitdir, oid, filepath })
    }
    try {
        const blob = await resolveBlob({fs, cache, gitdir, oid});
        return blob;
    } catch (e) {
        throw Error(`parseBlob error: ${e}`);
    }
    
}