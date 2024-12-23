import Base64 from '../src';

const plaintext = {
  emoji: '🙌😂👍🎉😍🔥✨💯😏✌️',
};

const plainTextUint8Array = {
  emoji: new Uint8Array([
    240, 159, 153, 140, 240, 159, 152, 130, 240, 159, 145, 141, 240, 159, 142, 137, 240, 159, 152, 141, 240, 159, 148,
    165, 226, 156, 168, 240, 159, 146, 175, 240, 159, 152, 143, 226, 156, 140, 239, 184, 143,
  ]),
};

describe('encode', () => {
  test('empty string', () => {
    expect(Base64.encode('')).toBe('');
  });

  test(`${plaintext.emoji} - normal(padding)`, () => {
    expect(Base64.encode(plaintext.emoji, { padding: true, urlSafe: false })).toBe(
      '8J+ZjPCfmILwn5GN8J+OifCfmI3wn5Sl4pyo8J+Sr/CfmI/inIzvuI8=',
    );
  });

  test(`${plaintext.emoji} - normal(no-padding)`, () => {
    expect(Base64.encode(plaintext.emoji, { padding: false, urlSafe: false })).toBe(
      '8J+ZjPCfmILwn5GN8J+OifCfmI3wn5Sl4pyo8J+Sr/CfmI/inIzvuI8',
    );
  });

  test(`${plaintext.emoji} - url safe`, () => {
    expect(Base64.encode(plaintext.emoji)).toBe('8J-ZjPCfmILwn5GN8J-OifCfmI3wn5Sl4pyo8J-Sr_CfmI_inIzvuI8');
  });
});

describe('decode', () => {
  test('empty string', () => {
    expect(Base64.decode('')).toStrictEqual(new Uint8Array());
  });

  test(`${plaintext.emoji} - normal(padding)`, () => {
    expect(Base64.decode('8J+ZjPCfmILwn5GN8J+OifCfmI3wn5Sl4pyo8J+Sr/CfmI/inIzvuI8=')).toStrictEqual(
      plainTextUint8Array.emoji,
    );
  });

  test(`${plaintext.emoji} - normal(no-padding)`, () => {
    expect(Base64.decode('8J+ZjPCfmILwn5GN8J+OifCfmI3wn5Sl4pyo8J+Sr/CfmI/inIzvuI8')).toStrictEqual(
      plainTextUint8Array.emoji,
    );
  });

  test(`${plaintext.emoji} - url safe`, () => {
    expect(Base64.decode('8J-ZjPCfmILwn5GN8J-OifCfmI3wn5Sl4pyo8J-Sr_CfmI_inIzvuI8')).toStrictEqual(
      plainTextUint8Array.emoji,
    );
  });
});

describe('decodeToString', () => {
  test('empty string', () => {
    expect(Base64.decodeToString('')).toBe('');
  });

  test(`${plaintext.emoji} - normal(padding)`, () => {
    expect(Base64.decodeToString('8J+ZjPCfmILwn5GN8J+OifCfmI3wn5Sl4pyo8J+Sr/CfmI/inIzvuI8=')).toBe(plaintext.emoji);
  });

  test(`${plaintext.emoji} - normal(no-padding)`, () => {
    expect(Base64.decodeToString('8J+ZjPCfmILwn5GN8J+OifCfmI3wn5Sl4pyo8J+Sr/CfmI/inIzvuI8')).toBe(plaintext.emoji);
  });

  test(`${plaintext.emoji} - url safe`, () => {
    expect(Base64.decodeToString('8J-ZjPCfmILwn5GN8J-OifCfmI3wn5Sl4pyo8J-Sr_CfmI_inIzvuI8')).toBe(plaintext.emoji);
  });
});
