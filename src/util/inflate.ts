import pako from 'pako'

export async function inflate(buffer: pako.Data) {
  return  pako.inflate(buffer)
}
