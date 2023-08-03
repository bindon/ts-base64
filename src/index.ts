/** RFC 4648 */

import { convertToString, convertToUint8Array } from './util';

const map = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const cachedNormalEncodingMap = new Array<number>(64);
const cachedUrlEncodingMap = new Array<number>(64);
const cachedDecodingMap = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 62, 0, 62, 0, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8,
  9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 0, 0, 0, 0, 63, 0, 26, 27, 28, 29, 30, 31, 32, 33,
  34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51,
];
const paddingMap = [0, 2, 1];

for (let idx = 0, len = map.length; idx < len; idx++) {
  const code = map.charCodeAt(idx);
  cachedNormalEncodingMap[idx] = code;
  cachedUrlEncodingMap[idx] = code;
  cachedDecodingMap[code] = idx;
}

cachedNormalEncodingMap[62] = 43; // '+'
cachedNormalEncodingMap[63] = 47; // '/'
cachedUrlEncodingMap[62] = 45; // '-'
cachedUrlEncodingMap[63] = 95; // '_'
cachedDecodingMap[43] = cachedDecodingMap[45] = 62;
cachedDecodingMap[47] = cachedDecodingMap[95] = 63;
let debug = '[';
for (let idx=0; idx<cachedDecodingMap.length; idx++) {
  debug += `${cachedDecodingMap[idx]}, `;
}

debug += ']';
console.log(debug);

interface Base64Options {
  urlSafe: boolean;
  padding: boolean;
}

const encode = (data: string | ArrayBuffer | Uint8Array, options?: Base64Options): string => {
  const plaintext = convertToUint8Array(data);
  const expectedLength = Math.ceil(plaintext.byteLength * (4 / 3));

  let ciphertextLength = expectedLength;
  let map = cachedUrlEncodingMap;

  if (options?.padding === true) {
    ciphertextLength += paddingMap[plaintext.byteLength % 3];
    map = cachedNormalEncodingMap;
  }

  const ciphertext = new Uint8Array(ciphertextLength);

  if (options?.padding === true) {
    ciphertext[ciphertextLength - 1] = 61;
    ciphertext[ciphertextLength - 2] = 61;
  }

  let plainIdx = 0;
  let cipherIdx = 0;

  while (plainIdx + 3 < plaintext.byteLength) {
    ciphertext[cipherIdx] = map[plaintext[plainIdx] >> 2];
    ciphertext[cipherIdx + 1] = map[((plaintext[plainIdx] << 4) | (plaintext[plainIdx + 1] >> 4)) & 0x3f];
    ciphertext[cipherIdx + 2] = map[((plaintext[plainIdx + 1] << 2) | (plaintext[plainIdx + 2] >> 6)) & 0x3f];
    ciphertext[cipherIdx + 3] = map[plaintext[plainIdx + 2] & 0x3f];
    plainIdx += 3;
    cipherIdx += 4;
  }

  ciphertext[cipherIdx] = map[plaintext[plainIdx] >> 2];
  ciphertext[cipherIdx + 1] = map[((plaintext[plainIdx] << 4) | (plaintext[plainIdx + 1] >> 4)) & 0x3f];
  if (plainIdx + 1 < plaintext.byteLength) {
    ciphertext[cipherIdx + 2] = map[((plaintext[plainIdx + 1] << 2) | (plaintext[plainIdx + 2] >> 6)) & 0x3f];
  }
  if (plainIdx + 2 < plaintext.byteLength) {
    ciphertext[cipherIdx + 3] = map[plaintext[plainIdx + 2] & 0x3f];
  }

  return new TextDecoder().decode(ciphertext);
};

const decode = (data: string): Uint8Array => {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
};

const decodeToString = (data: string): string => {
  return convertToString(decode(data));
};

export { encode, decode, decodeToString };
