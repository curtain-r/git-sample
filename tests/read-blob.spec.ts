import { readBlob } from "../src/command/read-blob";
import fs from 'fs-extra'
import { parseU8ToString } from "../src/util";
import { readTree } from "../src/command/read-tree";


(async() => {
    const blobInfo = await readBlob({
        fs,
        gitdir: '/Users/sam/sam_files/git-sample/.git',
        oid: '8c85793a07ad592dde64f047be063f073a5b1c4f'
    })
    console.log(blobInfo.type, blobInfo.size, parseU8ToString(blobInfo.blob));

    const treeInfo = await readTree({
        fs,
        gitdir: '/Users/sam/sam_files/git-sample/.git',
        oid: 'b17ac9741e55853726bc956b7edcb3680a15eedb'
    })
    console.log(treeInfo.type, treeInfo.size, parseU8ToString(treeInfo.blob));
})();