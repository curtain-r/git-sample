import { normalizePath } from './normalize-path'

export const join = (...parts: string[]) => {
  return normalizePath(parts.map(normalizePath).join('/'))
}