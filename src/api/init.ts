import {join} from 'path';
import { _init } from '../command/init';
import { InitOption } from '../type';
export const init = async ({
    fs,
    bare = false,
    dir,
    gitdir = bare ? dir : join(dir, '.git'),
    defaultBranch='master'
}: InitOption) => {
    try {
        return await _init({
            fs,
            bare,
            dir,
            gitdir,
            defaultBranch
        })
    } catch (error) {
        throw error
    } 
}