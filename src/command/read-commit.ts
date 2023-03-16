import fs from 'fs-extra';

export const parseCommit = async (commitId: string) => {
    const dirName = commitId.slice(0, 2);
    const fileName = commitId.slice(2);
    await 
}