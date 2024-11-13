"use strict";
/* eslint-disable max-statements */
/* eslint-disable no-bitwise */
/**
 * RFC 4648
 *
 * @author bindon
 */
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./util");
const map = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const cachedNormalEncodingMap = new Array(64);
const cachedUrlEncodingMap = new Array(64);
const cachedDecodingMap = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 62, 0, 62, 0, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8,
    9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 0, 0, 0, 0, 63, 0, 26, 27, 28, 29, 30, 31, 32, 33,
    34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51,
];
const paddingMap = [0, 2, 1];
for (let idx = 0, len = map.length; idx < len; idx += 1) {
    const code = map.charCodeAt(idx);
    cachedNormalEncodingMap[idx] = code;
    cachedUrlEncodingMap[idx] = code;
    cachedDecodingMap[code] = idx;
}
// Base64:62('+') > ASCII:43('+')
cachedNormalEncodingMap[62] = 43;
// Base64:63('/') > ASCII:47('/')
cachedNormalEncodingMap[63] = 47;
// Base64:62('-') > ASCII:45('-')
cachedUrlEncodingMap[62] = 45;
// Base64:63('_') > ASCII:95('_')
cachedUrlEncodingMap[63] = 95;
// ASCII:43('+')
cachedDecodingMap[43] = 62;
// ASCII:45('-')
cachedDecodingMap[45] = 62;
// ASCII:47('/')
cachedDecodingMap[47] = 63;
// ASCII:95('_')
cachedDecodingMap[95] = 63;
const encode = (data, options) => {
    const plaintext = (0, util_1.convertToUint8Array)(data);
    let expectedLength = Math.ceil((plaintext.byteLength * 4) / 3);
    const isRequiredPadding = options?.urlSafe === false && options?.padding;
    let cachedMap = cachedUrlEncodingMap;
    if (options?.urlSafe === false) {
        cachedMap = cachedNormalEncodingMap;
    }
    if (isRequiredPadding) {
        expectedLength += paddingMap[plaintext.byteLength % 3];
    }
    const ciphertext = new Uint8Array(expectedLength);
    if (isRequiredPadding) {
        // 61 === '='
        ciphertext[expectedLength - 1] = 61;
        ciphertext[expectedLength - 2] = 61;
    }
    let plainIdx = 0;
    let cipherIdx = 0;
    while (plainIdx + 3 < plaintext.byteLength) {
        ciphertext[cipherIdx] = cachedMap[plaintext[plainIdx] >> 2];
        ciphertext[cipherIdx + 1] = cachedMap[((plaintext[plainIdx] << 4) | (plaintext[plainIdx + 1] >> 4)) & 0x3f];
        ciphertext[cipherIdx + 2] = cachedMap[((plaintext[plainIdx + 1] << 2) | (plaintext[plainIdx + 2] >> 6)) & 0x3f];
        ciphertext[cipherIdx + 3] = cachedMap[plaintext[plainIdx + 2] & 0x3f];
        plainIdx += 3;
        cipherIdx += 4;
    }
    ciphertext[cipherIdx] = cachedMap[plaintext[plainIdx] >> 2];
    ciphertext[cipherIdx + 1] = cachedMap[((plaintext[plainIdx] << 4) | (plaintext[plainIdx + 1] >> 4)) & 0x3f];
    if (plainIdx + 1 < plaintext.byteLength) {
        ciphertext[cipherIdx + 2] = cachedMap[((plaintext[plainIdx + 1] << 2) | (plaintext[plainIdx + 2] >> 6)) & 0x3f];
    }
    if (plainIdx + 2 < plaintext.byteLength) {
        ciphertext[cipherIdx + 3] = cachedMap[plaintext[plainIdx + 2] & 0x3f];
    }
    return new TextDecoder().decode(ciphertext);
};
const decode = (data) => {
    const ciphertext = (0, util_1.convertToUint8Array)(data);
    const expectedLength = Math.ceil(data.length / 4) * 3;
    const plaintext = new Uint8Array(expectedLength);
    let cipherIdx = 0;
    let plainIdx = 0;
    while (cipherIdx + 4 < ciphertext.byteLength) {
        plaintext[plainIdx] =
            (cachedDecodingMap[ciphertext[cipherIdx]] << 2) | (cachedDecodingMap[ciphertext[cipherIdx + 1]] >> 4);
        plaintext[plainIdx + 1] =
            (cachedDecodingMap[ciphertext[cipherIdx + 1]] << 4) | (cachedDecodingMap[ciphertext[cipherIdx + 2]] >> 2);
        plaintext[plainIdx + 2] =
            (cachedDecodingMap[ciphertext[cipherIdx + 2]] << 6) | cachedDecodingMap[ciphertext[cipherIdx + 3]];
        plainIdx += 3;
        cipherIdx += 4;
    }
    if (ciphertext[cipherIdx] && ciphertext[cipherIdx + 1]) {
        plaintext[plainIdx] =
            (cachedDecodingMap[ciphertext[cipherIdx]] << 2) | (cachedDecodingMap[ciphertext[cipherIdx + 1]] >> 4);
        plainIdx += 1;
        cipherIdx += 1;
    }
    if (ciphertext[cipherIdx] && ciphertext[cipherIdx + 1] && ciphertext[cipherIdx + 1] !== 61) {
        plaintext[plainIdx] =
            (cachedDecodingMap[ciphertext[cipherIdx]] << 4) | (cachedDecodingMap[ciphertext[cipherIdx + 1]] >> 2);
        plainIdx += 1;
        cipherIdx += 1;
    }
    if (ciphertext[cipherIdx] && ciphertext[cipherIdx + 1] && ciphertext[cipherIdx + 1] !== 61) {
        plaintext[plainIdx] =
            (cachedDecodingMap[ciphertext[cipherIdx]] << 6) | cachedDecodingMap[ciphertext[cipherIdx + 1]];
        plainIdx += 1;
        cipherIdx += 1;
    }
    return plaintext.subarray(0, plainIdx);
};
const decodeToString = (data) => {
    return (0, util_1.convertToString)(decode(data));
};
const Base64 = {
    decode,
    decodeToString,
    encode,
};
exports.default = Base64;
