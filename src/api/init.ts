import {join} from 'path';
import { _init } from '../command/init';
export const init = async ({
    fs,
    bare = false,
    dir,
    gitdir = bare ? dir : join('dir', '.git'),
    defaultBranch
}) => {
    try {
        return await _init({
            fs,
            bare,
            gitdir,
            defaultBranch
        })
    } catch (error) {
        throw error
    } 
}