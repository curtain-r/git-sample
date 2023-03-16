import { UnwrapData } from "../type"


export class GitObject {
    // static wrap({ type, object }) {
    //   return Buffer.concat([
    //     Buffer.from(`${type} ${object.byteLength.toString()}\x00`),
    //     Buffer.from(object),
    //   ])
    // }
  
    static unwrap(buffer: Buffer): UnwrapData {
      const s = buffer.indexOf(32)
      const i = buffer.indexOf(0)
      const type = buffer.slice(0, s).toString('utf8')
      const length = buffer.slice(s + 1, i).toString('utf8')
      const actualLength = buffer.length - (i + 1)
      // verify length
      if (parseInt(length) !== actualLength) {
        throw new Error(
          `Length mismatch: expected ${length} bytes but got ${actualLength} instead.`
        )
      }
      return {
        type,
        size: length,
        object: Buffer.from(buffer.slice(i + 1)),
      }
    }
  }