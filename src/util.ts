export const stringToUint8Array = (data: string): Uint8Array => {
  const codePoints = Array.from(data).map((char) => char.codePointAt(0));
  const uint8Array = new Uint8Array(codePoints.length << 2);
  let offset = 0;

  for (let i = 0; i < codePoints.length; i++) {
    const codePoint = codePoints[i];
    if (codePoint === undefined) {
      continue;
    }

    if (codePoint <= 0x7f) {
      uint8Array[offset++] = codePoint;
    } else if (codePoint <= 0x7ff) {
      uint8Array[offset++] = 0xc0 | (codePoint >> 6);
      uint8Array[offset++] = 0x80 | (codePoint & 0x3f);
    } else if (codePoint <= 0xffff) {
      uint8Array[offset++] = 0xe0 | (codePoint >> 12);
      uint8Array[offset++] = 0x80 | ((codePoint >> 6) & 0x3f);
      uint8Array[offset++] = 0x80 | (codePoint & 0x3f);
    } else {
      uint8Array[offset++] = 0xf0 | (codePoint >> 18);
      uint8Array[offset++] = 0x80 | ((codePoint >> 12) & 0x3f);
      uint8Array[offset++] = 0x80 | ((codePoint >> 6) & 0x3f);
      uint8Array[offset++] = 0x80 | (codePoint & 0x3f);
    }
  }

  return uint8Array.subarray(0, offset);
};

export const uint8ArrayToString = (data: Uint8Array): string => {
  return String.fromCharCode(...data);
};

export const convertToUint8Array = (data: string | ArrayBuffer | Buffer | Uint8Array): Uint8Array => {
  if (typeof data === 'string') {
    if (typeof Buffer === 'function') {
      return new Uint8Array(Buffer.from(data));
    }
    if (typeof TextEncoder === 'function') {
      return new TextEncoder().encode(data);
    }
    return stringToUint8Array(data);
  } else if (data instanceof ArrayBuffer || data instanceof Buffer) {
    return new Uint8Array(data);
  } else if (data instanceof Uint8Array) {
    return data;
  } else {
    throw Error('Unsupported type');
  }
};

export const convertToString = (data: string | ArrayBuffer | Buffer | Uint8Array): string => {
  if (typeof data === 'string') {
    return data;
  } else if (data instanceof ArrayBuffer) {
    return uint8ArrayToString(new Uint8Array(data));
  } else if (data instanceof Buffer) {
    return data.toString();
  } else if (data instanceof Uint8Array) {
    return uint8ArrayToString(data);
  } else {
    throw Error('Unsupported type');
  }
};
