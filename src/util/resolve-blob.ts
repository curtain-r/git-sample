import { ReadObjectOption } from "../type";
import { _readObject as readObject } from '../storage/read-object'

export const resolveBlob = async(resolveBlobOption: ReadObjectOption) => {
    const { fs, cache, gitdir, oid } = resolveBlobOption;
    const res = await readObject({fs, cache, gitdir, oid});
    const { type, object, size } = res;
    if (!res) {
        throw Error('res undefined')
    }
    // new Uint8Array(res.object) -> unit8Array 在Browser和nodejs都可以使用
    return { type, oid, blob: new Uint8Array(object), size: size };
}
