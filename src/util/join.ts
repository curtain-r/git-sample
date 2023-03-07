import { normalizePath } from './normalizePath'

export function join(...parts: string[]) {
  return normalizePath(parts.map(normalizePath).join('/'))
}