import { join } from "../util/join";
import { Fs } from "../type"

export const _init = async ({fs,bare,gitdir,defaultBranch}:{
    fs: Fs;
    bare: boolean;
    gitdir: string;
    defaultBranch: string;
}) => {
    if (await fs.exists(gitdir + '/config')) return;

    let folders = [
        'hooks',
        'info',
        'objects/info',
        'objects/pack',
        'refs/heads',
        'refs/tags'
    ]
    folders = folders.map(d => join(gitdir, d));
    for (const folder of folders) {
        await fs.mkdir(folder);
    }

    await fs.writeFile(
        join(gitdir, 'config'),
        '\trepositoryformatversion = 0\n' +
        '\tfilemode = false\n' +
        `\tbare = ${bare}\n` +
        (bare ? '' : '\tlogallrefupdates = true\n') +
        '\tsymlinks = false\n' +
        '\tignorecase = true\n'
    );
    await fs.writeFile(join(gitdir, 'HEAD'), `ref: refs/heads/${defaultBranch}\n`);

}