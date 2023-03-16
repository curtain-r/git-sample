import { Entry } from '../type'
import { compareStrings } from './compare-string'

export const comparePath = (a: Entry, b: Entry) => {
  return compareStrings(a.path, b.path)
}
