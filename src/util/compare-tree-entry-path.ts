import { Entry } from '../type'
import { compareStrings } from './compare-string'

export function compareTreeEntryPath(a: Entry, b: Entry) {
  return compareStrings(appendSlashIfDir(a), appendSlashIfDir(b))
}

function appendSlashIfDir(entry: Entry) {
  return entry.mode === '040000' ? entry.path + '/' : entry.path
}
