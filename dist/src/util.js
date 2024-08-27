"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertToString = exports.convertToUint8Array = exports.uint8ArrayToString = exports.stringToUint8Array = void 0;
/* eslint-disable max-statements */
/* eslint-disable no-bitwise */
/* eslint-disable no-plusplus */
const stringToUint8Array = (data) => {
    const codePoints = Array.from(data).map((char) => char.codePointAt(0));
    const uint8Array = new Uint8Array(codePoints.length << 2);
    let offset = 0;
    codePoints.forEach((codePoint) => {
        if (!codePoint) {
            return;
        }
        if (codePoint <= 0x7f) {
            uint8Array[offset++] = codePoint;
        }
        else if (codePoint <= 0x7ff) {
            uint8Array[offset++] = 0xc0 | (codePoint >> 6);
            uint8Array[offset++] = 0x80 | (codePoint & 0x3f);
        }
        else if (codePoint <= 0xffff) {
            uint8Array[offset++] = 0xe0 | (codePoint >> 12);
            uint8Array[offset++] = 0x80 | ((codePoint >> 6) & 0x3f);
            uint8Array[offset++] = 0x80 | (codePoint & 0x3f);
        }
        else {
            uint8Array[offset++] = 0xf0 | (codePoint >> 18);
            uint8Array[offset++] = 0x80 | ((codePoint >> 12) & 0x3f);
            uint8Array[offset++] = 0x80 | ((codePoint >> 6) & 0x3f);
            uint8Array[offset++] = 0x80 | (codePoint & 0x3f);
        }
    });
    return uint8Array.subarray(0, offset);
};
exports.stringToUint8Array = stringToUint8Array;
const uint8ArrayToString = (data) => {
    return new TextDecoder().decode(data);
};
exports.uint8ArrayToString = uint8ArrayToString;
const convertToUint8Array = (data) => {
    if (typeof data === 'string') {
        if (typeof Buffer === 'function') {
            return new Uint8Array(Buffer.from(data));
        }
        if (typeof TextEncoder === 'function') {
            return new TextEncoder().encode(data);
        }
        return (0, exports.stringToUint8Array)(data);
    }
    if (data instanceof ArrayBuffer || data instanceof Buffer) {
        return new Uint8Array(data);
    }
    if (data instanceof Uint8Array) {
        return data;
    }
    throw Error('Unsupported type');
};
exports.convertToUint8Array = convertToUint8Array;
const convertToString = (data) => {
    if (typeof data === 'string') {
        return data;
    }
    if (data instanceof ArrayBuffer) {
        return (0, exports.uint8ArrayToString)(new Uint8Array(data));
    }
    if (data instanceof Buffer) {
        return data.toString();
    }
    if (data instanceof Uint8Array) {
        return (0, exports.uint8ArrayToString)(data);
    }
    throw Error('Unsupported type');
};
exports.convertToString = convertToString;
