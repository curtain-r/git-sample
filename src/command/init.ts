import { join } from "../util/join";
import { InitOption } from "../type"

export const _init = async ({fs, bare, dir, gitdir, defaultBranch}: InitOption) => {
    const gitBaseDir = gitdir ?? join(dir, '.git');
    await fs.ensureDir(gitBaseDir);
    if (await fs.exists(gitBaseDir + '/config')) return;

    let folders = [
        'hooks',
        'info',
        'objects/info',
        'objects/pack',
        'refs/heads',
        'refs/tags'
    ]
    folders = folders.map(d => join(gitBaseDir, d));
    for (const folder of folders) {
        await fs.ensureDir(folder);
    }

    await fs.writeFile(
        join(gitBaseDir, 'config'),
        '\trepositoryformatversion = 0\n' +
        '\tfilemode = false\n' +
        `\tbare = ${bare}\n` +
        (bare ? '' : '\tlogallrefupdates = true\n') +
        '\tsymlinks = false\n' +
        '\tignorecase = true\n'
    );
    await fs.writeFile(join(gitBaseDir, 'HEAD'), `ref: refs/heads/${defaultBranch}\n`);
}