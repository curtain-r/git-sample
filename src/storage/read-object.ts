import { ReadObjectOption } from "../type"
import { inflate } from "../util/inflate";
import { shasum } from "../util/shasum";
import { readObjectLoose } from "./read-object-loose";
import { GitObject } from '../models/git-object';


export const _readObject = async ({
  fs,
  cache,
  gitdir,
  oid,
  format='content',
}: ReadObjectOption) => {
//   const getExternalRefDelta = oid => _readObject({ fs, cache, gitdir, oid })

  let result: any;

  // if(oid === '4b825dc642cb6eb9a060e54bf8d69288fbee4904') {
  //   result = { format: 'wrapped', object: Buffer.from(`tree 0\x00`) }
  // }

  if (!result) {
    result = await readObjectLoose({ fs, gitdir, oid })
  }

//   if (!result) {
//     result = await readObjectPacked({
//       fs,
//       cache,
//       gitdir,
//       oid,
//       getExternalRefDelta,
//     })
//   }
  // Finally
  if (!result) {
    throw new Error(`not found ${oid}`)
  }

  if (format === 'deflated') {
    return result
  }

  if (result.format === 'deflated') {
    result.object = Buffer.from(await inflate(result.object))
    result.format = 'wrapped'
  }

  if (result.format === 'wrapped') {
    if (format === 'wrapped' && result.format === 'wrapped') {
      return result
    }
    const sha = await shasum(result.object)
    if (sha !== oid) {
      throw new Error(
        `SHA check failed! Expected ${oid}, computed ${sha}`
      )
    }
    const { object, type, size } = GitObject.unwrap(result.object)
    result.type = type;
    result.object = object;
    result.format = 'content';
    result.size = size;
  }

  if (result.format === 'content') {
    if (format === 'content') return result
    return
  }

  throw new Error(`invalid format "${result.format}"`)
}
