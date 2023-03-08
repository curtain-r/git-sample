import { normalizePath } from './normalizePath'

export const join = (...parts: string[]) => {
  return normalizePath(parts.map(normalizePath).join('/'))
}