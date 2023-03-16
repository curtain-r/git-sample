/* eslint-env node, browser */
// import Hash from 'sha.js/sha1.js'

import {toHex} from './to-hex'
import { createHash } from 'crypto';
let supportsSubtleSHA1 = false

export async function shasum(buffer: Uint8Array) {
  if (!supportsSubtleSHA1) {
    supportsSubtleSHA1 = await testSubtleSHA1()
  }
  return supportsSubtleSHA1 ? subtleSHA1(buffer) : 'xxx';
};


// browser
// function shasumSync(buffer) {
//   return new Hash().update(buffer).digest('hex')
// }

async function subtleSHA1(buffer: Uint8Array) {
  const sha1 = createHash('sha1').update(buffer).digest('hex');
  return sha1
}

async function testSubtleSHA1() {
  // I'm using a rather crude method of progressive enhancement, because
  // some browsers that have crypto.subtle.digest don't actually implement SHA-1.
  try {
    const hash = await subtleSHA1(new Uint8Array([]))
    if (hash === 'da39a3ee5e6b4b0d3255bfef95601890afd80709') return true
  } catch (_) {
    // no bother
  }
  return false
}
