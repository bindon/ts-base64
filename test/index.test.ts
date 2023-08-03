import { encode } from '../src';
import { stringToUint8Array } from '../src/util';

describe('@bindon/base64', () => {
  test('encode: empty string', () => {
    encode('');
  });

  describe('emoji to Uint8Array', () => {
    const plaintext = '🙌😂👍🎉😍🔥✨💯😏✌️';
    const ciphertext = new Uint8Array([
      240, 159, 153, 140, 240, 159, 152, 130, 240, 159, 145, 141, 240, 159, 142, 137, 240, 159, 152, 141, 240, 159, 148,
      165, 226, 156, 168, 240, 159, 146, 175, 240, 159, 152, 143, 226, 156, 140, 239, 184, 143,
    ]);
    test('Buffer', () => {
      expect(new Uint8Array(Buffer.from(plaintext))).toStrictEqual(ciphertext);
    });
    test('TextEncoder', () => {
      expect(new TextEncoder().encode(plaintext)).toStrictEqual(ciphertext);
    });
    test('Pure', () => {
      expect(stringToUint8Array(plaintext)).toStrictEqual(ciphertext);
    });
  });
});
