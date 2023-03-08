import fs from 'fs-extra';

export type Fs = typeof fs

export type InitOption = {
    fs: Fs;
    bare?: boolean;
    dir: string;
    gitdir?: string;
    defaultBranch?: string;
}