import { init } from "../src/api/init";

import fs from 'fs-extra'

(async () => {
    await init({
        fs,
        dir: '/Users/sam/sam_files/sample-git-base/'
    })
})();