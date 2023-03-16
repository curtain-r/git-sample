import { Entry, FileMode } from '../type'
import { comparePath } from '../util/compare-path'
import { compareTreeEntryPath } from '../util/compare-tree-entry-path'

/**
 *
 * @typedef {Object} TreeEntry
 * @property {string} mode - the 6 digit hexadecimal mode
 * @property {string} path - the name of the file or directory
 * @property {string} oid - the SHA-1 object id of the blob or tree
 * @property {'commit'|'blob'|'tree'} type - the type of object
 */
const FileModuleMap ={
    '040000': 'tree',
    '100644': 'blob',
    '100755': 'blob',
    '120000': 'blob',
    '160000': 'commit',
}
const mode2type = (mode: FileMode) => {
  return FileModuleMap[mode]
}

const parseBuffer = (buffer: Buffer): Entry[] => {
  const _entries = []
  let cursor = 0
  while (cursor < buffer.length) {
    const space = buffer.indexOf(32, cursor)
    if (space === -1) {
      throw new Error(
        `GitTree: Error parsing buffer at byte location ${cursor}: Could not find the next space character.`
      )
    }
    const nullChar = buffer.indexOf(0, cursor)
    if (nullChar === -1) {
      throw new Error(
        `GitTree: Error parsing buffer at byte location ${cursor}: Could not find the next null character.`
      )
    }
    let mode = buffer.slice(cursor, space).toString('utf8') 
    if (mode === '40000') mode = '040000'
    const type = mode2type(mode as FileMode)
    const path = buffer.slice(space + 1, nullChar).toString('utf8')

    if (path.includes('\\') || path.includes('/')) {
      throw new Error("不该存在的文件名/目录名");
    }

    const oid = buffer.slice(nullChar + 1, nullChar + 21).toString('hex')
    cursor = nullChar + 21
    _entries.push({ mode, path, oid, type })
  }
  return _entries
}

function limitModeToAllowed(mode: number): FileMode {
    let strMode = '';
  if (typeof mode === 'number') {
    strMode = mode.toString(8)
  }
  // tree
  if (strMode.match(/^0?4.*/)) return '040000' // Directory
  if (strMode.match(/^1006.*/)) return '100644' // Regular non-executable file
  if (strMode.match(/^1007.*/)) return '100755' // Regular executable file
  if (strMode.match(/^120.*/)) return '120000' // Symbolic link
  if (strMode.match(/^160.*/)) return '160000' // Commit (git submodule reference)
  throw new Error(`Could not understand file mode: ${mode}`)
}

function nudgeIntoShape(entry: any) {
  if (!entry.oid && entry.sha) {
    entry.oid = entry.sha // Github
  }
  entry.mode = limitModeToAllowed(entry.mode) // index
  if (!entry.type) {
    entry.type = mode2type(entry.mode) // index
  }
  return entry
}

export class GitTree {
    _entries: Entry[];
  constructor(entries: Buffer | Array<Entry>) {
    if (Buffer.isBuffer(entries)) {
      this._entries = parseBuffer(entries)
    } else if (Array.isArray(entries)) {
      this._entries = entries.map(nudgeIntoShape)
    } else {
      throw new Error('invalid type passed to GitTree constructor')
    }
    this._entries.sort(comparePath)
  }

  static from(tree: Buffer | Array<Entry>) {
    return new GitTree(tree)
  }

  render() {
    return this._entries
      .map(entry => `${entry.mode} ${entry.type} ${entry.oid}    ${entry.path}`)
      .join('\n')
  }

  toObject() {
    const entries = [...this._entries]
    entries.sort(compareTreeEntryPath)
    return Buffer.concat(
      entries.map(entry => {
        const mode = Buffer.from(entry.mode.replace(/^0/, ''))
        const space = Buffer.from(' ')
        const path = Buffer.from(entry.path, 'utf8')
        const nullChar = Buffer.from([0])
        const oid = Buffer.from(entry.oid, 'hex')
        return Buffer.concat([mode, space, path, nullChar, oid])
      })
    )
  }

 
  entries() {
    return this._entries
  }

  *[Symbol.iterator]() {
    for (const entry of this._entries) {
      yield entry
    }
  }
}
