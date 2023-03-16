import { ReadTreeOption } from '../type';
import { resolveTree } from '../util/resolve-tree';

export const readTree = async ({fs, cache, gitdir, oid, filepath = undefined}: ReadTreeOption) => {
    if (filepath !== undefined) {
        // oid = await resolveFilepath({ fs, cache, gitdir, oid, filepath })
    }
    try {
        const tree = await resolveTree({fs, cache, gitdir, oid});
        return tree;
    } catch (e) {
        throw Error(`parseTree error: ${e}`);
    }
    
}